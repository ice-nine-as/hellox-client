const clientConfigDev            = require('../webpack/client.dev');
const clientConfigProd           = require('../webpack/client.prod');
const compression                = require('compression');
const express                    = require('express');
const enforce                    = require('express-sslify');
const gulp                       = require('gulp');
const { readFileSync }           = require('fs');
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

const publicPath = clientConfigDev.output.publicPath;
const outputPath  = clientConfigDev.output.path;
const dev         = process.env.NODE_ENV === 'development';


const app = express();
app.use(compression());
app.use(serveFavicon(resolve(__dirname, '..', 'public', 'favicon-96x96.png')));

const serviceWorkerHeaderMiddleware = app.use((req, res, next) => {
  /* Give the service worker root scope. */
  res.setHeader('Service-Worker-Allowed', '/');
  next();
});

let isBuilt = false;

const getSpdyOptions = () => ({
  cert: readFileSync(resolve(__dirname, '..', 'private', 'live', 'hellox.me', 'fullchain.pem')),
  key:  readFileSync(resolve(__dirname, '..', 'private', 'live', 'hellox.me', 'privkey.pem')),
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
    if (!dev) {
      /* Minify the vendor file. */
      const path = resolve(__dirname, '..', 'dist', 'client', 'vendor.js');
      gulp.src(path, { base: dirname(path), })
        .pipe(uglify())
        .pipe(gulp.dest(dirname(path)));
    }

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

    app.use(publicPath, express.static(outputPath));
    app.use(render({ clientStats, }));
    
    done();
  });
}
