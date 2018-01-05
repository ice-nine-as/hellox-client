const path    = require('path');
const webpack = require('webpack');

const entry   = path.resolve(__dirname, '../server/render.js');
const output  = path.resolve(__dirname, '../dist/server');

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: [
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
          'babel-loader',
          'awesome-typescript-loader',
        ],
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },

          'less-loader',
        ],
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
  ],
};
