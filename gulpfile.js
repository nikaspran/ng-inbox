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


function serve() {
  const express = require('express');
  return express();
}

gulp.task('serve', () => {
  // TODO: production
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const app = serve();

  app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath
  }));

  app.listen(process.env.PORT);
});

gulp.task('test', done => {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['build:src']);
