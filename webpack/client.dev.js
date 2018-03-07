const AutoDllPlugin    = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { resolve, }     = require('path');
const webpack          = require('webpack');
const WriteFilePlugin  = require('write-file-webpack-plugin'); // here so you can see what chunks are built

module.exports = {
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

        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },

            'less-loader',
          ],
        }),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    new WriteFilePlugin(), /* Only needed for debug info. */
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'bootstrap', ], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),
    

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.HashedModuleIdsPlugin(),

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