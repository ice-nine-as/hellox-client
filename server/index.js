const dev = process.env.NODE_ENV === 'development';
console.log(`\nIs dev?   ${dev}`);

const h2 = require('./isHttp2')();
console.log(`Is HTTP2? ${h2}\n`);

console.log('Loading dependencies.');
const clientConfigDev            = require('../webpack/client.dev');
const clientConfigProd           = require('../webpack/client.prod');
const express                    = require('express');
const enforce                    = require('express-sslify');
const expressStaticGzip          = require('express-static-gzip');
const gulp                       = require('gulp');
const {
  readFile,
  readFileSync,
} = require('fs');
const nodeSES                    = require('node-ses');
const {
  dirname,
  resolve,
} = require('path');
const { promisify, }             = require('util');
const serveFavicon               = require('serve-favicon');
const spdy                       = require('spdy');
const serverConfigDev            = require('../webpack/server.dev');
const serverConfigProd           = require('../webpack/server.prod');
const uglify                     = require('gulp-uglify');
const webpack                    = require('webpack');
const webpackDevMiddleware       = require('webpack-dev-middleware');
const webpackHotMiddleware       = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
require('isomorphic-fetch');
console.log('Dependencies loaded.\n');

const publicPath  = clientConfigDev.output.publicPath;
const outputPath  = clientConfigDev.output.path;
const projectPath = resolve(__dirname, '..');
const imagesPath  = resolve(projectPath, 'images');
const fontsPath   = resolve(projectPath, 'fonts');

const app = express();

const headerMiddleware = app.use((req, res, next) => {
  /* Give the service worker root scope. */
  res.setHeader('Service-Worker-Allowed', '/');

  if (req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache');
  } else if (req.path === '/static/sw.js') {
    /* Only cache the service worker for 5 seconds. */
    res.setHeader('Cache-Control', 'max-age=5');
  } else if (/\.(js|css)$/.test(req.path) ||
             /\/fonts\/.+\.woff2?/.test(req.path))
  {
    /* Cache all scripts, styles, and fonts for one year. */
    res.setHeader('Cache-Control', 'max-age=31536000');
  } 

  /* Deny HTTP entirely. */
  res.setHeader('Strict-Transport-Security',
                'max-age=31536000 ; includeSubDomains');

  /* Deny all iframes/iframing of the site. */
  res.setHeader('X-Frame-Options', 'deny');

  /* Block all detected XSS attacks entirely. */
  res.setHeader('X-XSS-Protection', '1; mode=block');

  /* Execute the next middleware. */
  next();
});

app.use(serveFavicon(resolve(imagesPath, 'favicon-96x96.png')));
app.use('/fonts', express.static(resolve(fontsPath)));

/* Mirror the podcast feed to get around in-browser CORS issues. */ 
app.get('/podcast-feed.xml', async (req, res) => {
  try {
    const fetchRes = await fetch('https://www.blubrry.com/feeds/hello_x.xml');
    const text = await fetchRes.text();
    res.write(text);
    res.end();
  } catch (e) {
    console.error('Problem mirroring podcast feed.');
    console.error(e);
    res.status(500);
    res.end();
  }
});

/* Mail endpoint for story generator */
app.post('/story-generator-mailer', (req, res) => {
  console.error(req);

  const handleError = (e) => {
    console.error('Problem e-mailing story generator feed.');
    console.error(e);
    res.status(500);
    res.write('Sorry, there was a problem submitting the generated story.');
    res.end();
  };

  try {
    const credentials = require('./.email-credentials.json');

    const client = nodeSES.createClient({
      amazon: 'https://email.eu-west-1.amazonaws.com',
      key:    credentials.username,
      secret: credentials.password,
    });

    const sesArgs = {
      to:      'helloX@ice-9.no',
      from:    'no-reply@hellox.me',
      subject: `Here's your story, ${req.params.name}!`,
      message: `${req.params.story}`,
      altText: 'plain text',
    };
  
    const carbonCopy = req.params.carbonCopy;
    const replyTo = req.params.replyTo;
    if (carbonCopy && replyTo) {
      sesArgs.cc = replyTo;
    }

    // Give SES the details and let it construct the message for you.
    client.sendEmail(sesArgs, (err, data) => {
      if (err) {
        handleError(err);
      }
    });
  } catch (e) {
    handleError(e);
  }
});

let isBuilt = false;

/* Directory with keys in it. Currently volumed with Docker from the host
 * filesystem. */
const letsEncryptDir = resolve(projectPath, 'private', 'live', 'hellox.me');

const getSpdyOptions = () => ({
  cert: readFileSync(resolve(letsEncryptDir, 'fullchain.pem')),
  key:  readFileSync(resolve(letsEncryptDir, 'privkey.pem')),
  spdy: {
    protocols: [
      'h2',
      'spdy/3.1',
      'spdy/3',
      'spdy/2',
      'http/1.1',
      'http/1.0',
    ],
  },
});

const PRIMARY_PORT   = 3000;
const SECONDARY_PORT = 3001;

function done() {
  return !isBuilt && (() => {
    const server = h2 ? spdy.createServer(getSpdyOptions(), app) : app;
    server.keepAliveTimeout = 5;
    if (h2) {
      const second = express();
      second.use(enforce.HTTPS());
      second.listen(SECONDARY_PORT, (error) => {
        if (error) {
          throw error;
        }

        console.log(
          `HTTP->HTTPS redirector enabled @ http://localhost:${SECONDARY_PORT}.`);
      });
    }
    
    server.listen(PRIMARY_PORT, (error) => {
      if (error) {
        throw error;
      }

      isBuilt = true;
      console.log(
        `BUILD COMPLETE -- Listening @ http://localhost:${PRIMARY_PORT}.`);
    });

    return server;
  })();
}


if (dev) {
  const compiler = webpack([ clientConfigDev, serverConfigDev, ]);
  const clientCompiler = compiler.compilers[0];
  const options = {
    publicPath,
    stats: {
      colors: true,
    },
  };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: { outputPath, },
  }));

  compiler.plugin('done', done);
} else {
  webpack([ clientConfigProd, serverConfigProd, ]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require('../dist/server/main.js').x50Render;

    app.use(publicPath, expressStaticGzip(outputPath));
    app.use(render({ clientStats, }));

    done();
  });
}