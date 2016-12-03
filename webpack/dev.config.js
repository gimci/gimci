var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../src');

var config = {
  devtool: "source-map",
  entry: [
    APP_DIR + '/main.js',
    
  ],
  output: {
    path: BUILD_DIR,
    filename: 'gimci.js'
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

module.exports = config;
