const dev = process.env.NODE_ENV === 'development';
console.log(`\nIs dev?   ${dev}`);

const h2 = require('./isHttp2')();
console.log(`Is HTTP2? ${h2}\n`);

console.log('Loading dependencies.');

const bodyParser        = require('body-parser');
const clientConfigDev   = require('../webpack/client.dev');
const clientConfigProd  = require('../webpack/client.prod');
const express           = require('express');
const enforce           = require('express-sslify');
const expressStaticGzip = require('express-static-gzip');
const gulp              = require('gulp');

const {
  readFile,
  readFileSync,
} = require('fs');

const {
  dirname,
  resolve,
} = require('path');

const {
  publishToEmail,
} = require('./publishToEmail');

const {
  publishToGoogleSheet,
} = require('./publishToGoogleSheet');

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

/* Header middleware. */
app.use((req, res, next) => {
  /* Give the service worker root scope. */
  res.setHeader('Service-Worker-Allowed', '/');

  if (req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache');
  } else if (req.path === '/static/sw.js') {
    /* Only cache the service worker for 5 seconds. */
    res.setHeader('Cache-Control', 'max-age=5');
  } else if (/\.(js|css)$/.test(req.path) ||
             /\.woff2?$/.test(req.path))
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

/* Favicon middleware. */
app.use(serveFavicon(resolve(imagesPath, 'favicon-96x96.png')));

/* Fonts static file middleware. */
app.use('/fonts', express.static(resolve(fontsPath)));

/* Form parser middleware. */
app.use(bodyParser.urlencoded({ extended: true, }));

/* Mail endpoint for story generator */
app.post('/story-generator-mailer', (req, res) => {
  /* Cross-reference with StorySubmissionForm component. */
  
  const handleSheetsError = (e) => {
    console.error('Problem publishing generated story to Google Sheets.');
    console.error(e);
  };

  const handleEmailError = (e) => {
    console.error('Problem e-mailing generated story.');
    console.error(e);
    res.status(500);
    res.setHeader('content-type', 'content-type: text/plain; charset=utf-8');
    res.write(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello X E-mail error</title>
        </head>

        <body>
          <h3>
            Sorry, there was a problem e-mailing the generated story.
          </h3>

          <p>
            We've enclosed a copy of it below, in case you were expecting an e-mail.
          </p>

          <p>
            Or go back to the <strong><a href="/">homepage</a></strong>.
          </p>

          <h4>
            Your story
          </h4>

          <p>
            ${req.body.story.replace(/\n/g, '<br>')}
          </p>
        </body>`);

    res.end();
  };

  const sheetProm = publishToGoogleSheet(
    req.body.name,
    req.body.email,
    req.body.story);

  sheetProm.then(
    () => {},
    handleSheetsError,
  );

  const emailProm = publishToEmail(
    req.body.name,
    req.body.email,
    req.body.carbonCopy,
    req.body.story);

  emailProm.then(
    () => {},
    handleEmailError,
  );

  Promise.all([
    sheetProm,
    emailProm,
  ]).then(
    () => {
      /* Redirect to the home page. */
      res.redirect('/');
      res.end();
    },

    /* Log all errors not already caught. */
    console.log.bind(console),
  );
});

/* Google Analytics ownership endpoint */
app.get('/google2121db82d9189338.html', (req, res) => {
  res.write('google-site-verification: google2121db82d9189338.html');
  res.end();
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
    const render = require('../dist/server/main.js').helloXRender;

    app.use(publicPath, expressStaticGzip(outputPath));
    app.use(render({ clientStats, }));

    done();
  });
}
