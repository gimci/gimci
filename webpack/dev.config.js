var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../src');

var config = {
  devtool: "source-map",
  entry: [
    'webpack-dev-server/client?http://localhost:6001',
    'webpack/hot/only-dev-server',
    APP_DIR + '/main.js',
    
  ],
  output: {
    path: BUILD_DIR,
    filename: 'gimci.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    headers: { "Access-Control-Allow-Origin": "*" }
  },
};

module.exports = config;
