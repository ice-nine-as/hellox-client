const HardSourcePlugin = require('hard-source-webpack-plugin');
const { readdirSync, } = require('fs');
const { resolve, }     = require('path');
const webpack          = require('webpack');
const WriteFilePlugin  = require('write-file-webpack-plugin');

const nodeModules      = resolve(__dirname, '../node_modules');
const entry            = resolve(__dirname, '../server/render');
const output           = resolve(__dirname, '../dist/server');

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },

  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    entry,
  ],

  externals,
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    /* Totally unclear why this is necessary but it breaks otherwise. */
    publicPath: '',
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
        exclude(path) {
          return path.indexOf('x50-story-generator') === -1 &&
            path.indexOf('node_modules') !== -1;
        },

        use: 'babel-loader',
      },

      {
        test: /\.less$/,
        exclude(path) {
          return path.indexOf('x50-story-generator') === -1 &&
            path.indexOf('node_modules') !== -1;
        },

        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          },

          'less-loader',
        ],
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: 'css-loader',
      },
    ],
  },

  resolve: {
    extensions: [
      '.css',
      '.js',
      '.jsx',
      '.less',
      '.ts',
      '.tsx',
    ],
  },

  plugins: [
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    new HardSourcePlugin(),
  ],
};
