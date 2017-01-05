var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var BUILD_DIR = path.resolve(__dirname, '../lib');
var APP_DIR = path.resolve(__dirname, '../src');

var config = {
  devtool: "source-map",
  entry: [
    APP_DIR + '/main.js',
  ],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: BUILD_DIR,
    filename: 'gimci.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'node'
    })
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
};

module.exports = config;
