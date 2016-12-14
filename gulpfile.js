require('dotenv').config();
const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config');
const karma = require('karma');

gulp.task('build:src', () => {
  return gulp.src('app/app.ts')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('dist/'));
});

function mountDevServer(app) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath
  }));
}

gulp.task('serve', () => {
  const express = require('express');
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
  } else {
    mountDevServer(app);
  }

  app.listen(process.env.PORT);
});

gulp.task('test', done => {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['build:src']);
