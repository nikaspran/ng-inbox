require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  entry: [
    './app/app',
    './app/index.html'
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {test: /\.html$/, loaders: ['ngtemplate', 'html']},
      {test: /\.ts$/, loaders: ['ng-annotate', 'ts-loader']},
      {test: /\.css$/, loader: 'style!css'},
      {test: /app\/index\.html$/, loader: 'file?name=[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    })
  ]
};
