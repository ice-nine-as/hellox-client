require('colors');

const clientConfigDev            = require('../webpack/client.dev');
const clientConfigProd           = require('../webpack/client.prod');
const compression                = require('compression');
const express                    = require('express');
const { resolve, }               = require('path');
const serveFavicon               = require('serve-favicon');
const serverConfigDev            = require('../webpack/server.dev');
const serverConfigProd           = require('../webpack/server.prod');
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

let isBuilt = false;

function done() {
  return !isBuilt && (() => {
    const listen = app.listen(3000, () => {
      isBuilt = true;
      listen.keepAliveTimeout = 5;
      console.log('BUILD COMPLETE -- Listening @ http://localhost:3000.');
    });

    return listen;
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
