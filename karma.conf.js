module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    files: [
      'app/test-index.ts'
    ],

    preprocessors: {
      'app/test-index.ts': ['webpack']
    },

    webpack: require('./webpack.config')
  });
};
