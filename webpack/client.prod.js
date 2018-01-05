const path             = require('path');
const webpack          = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [ path.resolve(__dirname, '../src/index.tsx'), ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist/client/'),
    publicPath: '/static/',
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
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },

            {
              loader: 'less-loader',
            },
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
      names: [ 'bootstrap', ], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
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
  ],
};
