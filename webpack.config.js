var webpack = require('webpack');
var path = require('path');

/*
 * Default webpack configuration for development
 */
var config = {
  // cache: true,
  // resolve: {
  //   extensions: ['.less']
  // },
  entry:  "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.less$/,
      loader: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }]
  }
}

/*
 * If bundling for production, optimize output
 */

module.exports = config;