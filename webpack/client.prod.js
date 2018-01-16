const AutoDllPlugin    = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { resolve, }     = require('path');
const webpack          = require('webpack');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
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
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names:     [ 'bootstrap', ], // needed to put webpack bootstrap code before chunks
      filename:  '[name].[chunkhash].js',
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },

      mangle: {
        screw_ie8: true,
      },

      output: {
        screw_ie8: true,
        comments: false,
      },

      sourceMap: true,
    }),

    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)

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
