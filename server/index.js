require('colors');

const clientConfigDev            = require('../webpack/client.dev');
const clientConfigProd           = require('../webpack/client.prod');
const express                    = require('express');
const serverConfigDev            = require('../webpack/server.dev');
const serverConfigProd           = require('../webpack/server.prod');
const webpack                    = require('webpack');
const webpackDevMiddleware       = require('webpack-dev-middleware');
const webpackHotMiddleware       = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const publicPath = clientConfigDev.output.publicPath;
const outputPath = clientConfigDev.output.path;
const dev = process.env.NODE_ENV === 'development';

const app = express();

let isBuilt = false;

function done() {
  return !isBuilt && (() => {
    const listen = app.listen(3000, () => {
      isBuilt = true;
      listen.keepAliveTimeout = 15;
      console.log('BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta);
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
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin('done', done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../dist/server/main.js').render;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats, }));

    done();
  });
}
