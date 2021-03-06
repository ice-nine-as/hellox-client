const { resolve, }     = require('path');
const webpack          = require('webpack');

const entry  = resolve(__dirname, '../server/render');
const output = resolve(__dirname, '../dist/server');

module.exports = {
  mode: 'production',
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
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              minimize: true,
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
        use: {
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        },
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        H2: process.env.H2,
      },
    }),

    new webpack.HashedModuleIdsPlugin(),
  ],
};
