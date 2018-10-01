const AutoDllPlugin     = require('autodll-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractCssChunks  = require('extract-css-chunks-webpack-plugin');
const glob              = require('glob');
const {
  PageIdentifiers,
} = require('../src/Enums/PageIdentifiers');
const { resolve, } = require('path');
const OfflinePlugin = require('offline-plugin');
const webpack = require('webpack');

/* All pages except Home (already included at /) and Article+Podcast, which
 * require id url components. */
const pages = Object.keys(PageIdentifiers)
  .filter((page) => !/^Article|Home|Podcast$/.test(page))
  .map((key) => `/${key[0].toLowerCase()}${key.slice(1)}`);

 /* Add all font files to cache. */
const fontFiles = (() => {
  try {
    const globStr = resolve(__dirname, '..', 'fonts') + '/*.woff2';
    return glob.sync(globStr).map((fontFile) => {
      const fileName = fontFile.split('/').filter((aa) => aa).slice(-1)[0];
      return `/fonts/${fileName}`;
    });
  } catch (e) {
    console.log('Problem with font file glob search:');
    console.error(e);
    return [];
  }
})();

module.exports = {
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: [
    'babel-polyfill',
    resolve(__dirname, '../src/index.tsx'),
  ],

  output: {
    filename:      '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path:          resolve(__dirname, '../dist/client/'),
    publicPath:    '/static/',
  },

  stats: 'verbose',

  optimization: {
    minimize: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'awesome-typescript-loader?module=esnext',
        ],
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          ExtractCssChunks.loader,

          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },

          'postcss-loader',

          'less-loader',
        ],
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader',
          options: {
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.less',
      '.ts',
      '.tsx',
    ],
  },

  plugins: [    
    new ExtractCssChunks({
      filename:      '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    new CompressionPlugin(),
    
    new AutoDllPlugin({
      context: resolve(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'redux-first-router',
          'redux-first-router-link',
          'babel-polyfill',
        ],
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),

        new CompressionPlugin(),
      ],
    }),

    new OfflinePlugin({
      caches: 'all',
      events: true,
      excludes: [ 'https://cms.hellox.me/*', ],
      externals: [
        '/',
      ].concat(pages)
       .concat(fontFiles),

      ServiceWorker: {
        scope: '/',
        navigateFallbackURL: '/serverError',
      },
    }),
  ],
};
