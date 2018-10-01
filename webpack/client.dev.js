const AutoDllPlugin    = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { resolve, }     = require('path');
const webpack          = require('webpack');
const WriteFilePlugin  = require('write-file-webpack-plugin'); // here so you can see what chunks are built

module.exports = {
  mode: 'development',
  name: 'client',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    'babel-polyfill',
    resolve(__dirname, '../src/index.tsx'),
  ],

  output: {
    filename:      '[name].js',
    chunkFilename: '[name].js',
    path:           resolve(__dirname, '../dist/client'),
    publicPath:     '/static/',
  },
  
  optimization: {},

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
    new ExtractCssChunks(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

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
    }),
  ],
};