const HardSourcePlugin = require('hard-source-webpack-plugin');
const { resolve, }     = require('path');
const webpack          = require('webpack');

const entry            = resolve(__dirname, '../server/render');
const output           = resolve(__dirname, '../dist/server');

module.exports = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },

  entry: [
    'babel-polyfill',
    entry,
  ],

  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
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
            }
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new HardSourcePlugin(),
  ],
};
