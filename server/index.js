const clientConfigDev            = require('../webpack/client.dev');
const clientConfigProd           = require('../webpack/client.prod');
const express                    = require('express');
const enforce                    = require('express-sslify');
const expressStaticGzip          = require('express-static-gzip');
const gulp                       = require('gulp');
const { readFileSync, }          = require('fs');
const {
  dirname,
  resolve,
} = require('path');
const serveFavicon               = require('serve-favicon');
const spdy                       = require('spdy');
const serverConfigDev            = require('../webpack/server.dev');
const serverConfigProd           = require('../webpack/server.prod');
const uglify                     = require('gulp-uglify');
const webpack                    = require('webpack');
const webpackDevMiddleware       = require('webpack-dev-middleware');
const webpackHotMiddleware       = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const dev = process.env.NODE_ENV === 'development';
console.log(`Is dev: ${dev}`);

const publicPath  = clientConfigDev.output.publicPath;
const outputPath  = clientConfigDev.output.path;
const projectPath = resolve(__dirname, '..');
const imagesPath  = resolve(projectPath, 'images');
const fontsPath   = resolve(projectPath, 'fonts');

const app = express();
app.use(serveFavicon(resolve(imagesPath, 'favicon-96x96.png')));
app.use('/fonts', express.static(resolve(fontsPath)));

const headerMiddleware = app.use((req, res, next) => {
  /* Give the service worker root scope. */
  res.setHeader('Service-Worker-Allowed', '/');

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

let isBuilt = false;

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

const isHttp2 = /^true$/i.test(process.env.H2);

function done() {
  return !isBuilt && (() => {
    const server = isHttp2 ?
      spdy.createServer(getSpdyOptions(), app) :
      app;

    server.keepAliveTimeout = 5;

    if (isHttp2) {
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