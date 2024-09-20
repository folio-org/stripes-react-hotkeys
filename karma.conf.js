var webpackCfg = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: ['webpack', 'mocha', 'chai'],
    reporters: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      // { pattern: 'test/**/*.js' }
      'test/index.js'
    ],

    preprocessors: {
      // 'test/**/*.js' : ['webpack', 'sourcemap']
      'test/index.js' : ['webpack', 'sourcemap']
    },

    webpack: webpackCfg,

    webpackMiddleware: {
      stats: 'errors-only',
    },

    mochaReporter: {
      showDiff: true,
    },

    client: {
      clearContext: false,
    },

    port: 9876,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}
