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
      {test: /app\/index\.html$/, loader: 'file?name=[name].[ext]'}
    ]
  },
};
