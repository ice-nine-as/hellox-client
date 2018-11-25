const dev = process.env.NODE_ENV === 'development';
console.log(`\nIs dev?   ${dev}`);

const h2 = require('./isHttp2').isHttp2();
console.log(`Is HTTP2? ${h2}\n`);

console.log('Loading dependencies.');

const {
  applyMiddlewares,
} = require('./middleware/applyMiddlewares');

const clientConfigDev   = require('../webpack/client.dev');
const clientConfigProd  = require('../webpack/client.prod');
const express           = require('express');
const enforce           = require('express-sslify');
const expressStaticGzip = require('express-static-gzip');

const {
  getSpdyOptions,
} = require('./getSpdyOptions');

const spdy                       = require('spdy');
const serverConfigDev            = require('../webpack/server.dev');
const serverConfigProd           = require('../webpack/server.prod');
const webpack                    = require('webpack');
const webpackDevMiddleware       = require('webpack-dev-middleware');
const webpackHotMiddleware       = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
require('isomorphic-fetch');

console.log('Dependencies loaded.');

const publicPath = clientConfigDev.output.publicPath;
const outputPath = clientConfigDev.output.path;

const app = express();

/* Apply all middlewares to the server. */
applyMiddlewares(app);

let isBuilt = false;

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

  const devMiddleware = webpackDevMiddleware(compiler, options);

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: { outputPath, },
  }));
  
  devMiddleware.waitUntilValid(done);
} else {
  webpack([ clientConfigProd, serverConfigProd, ]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require('../dist/server/main.js').helloXRender;

    app.use(publicPath, expressStaticGzip(outputPath));
    app.use(render({ clientStats, }));

    done();
  });
}