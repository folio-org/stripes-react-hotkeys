var webpackCfg = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/index.js', watch: false }
    ],

    preprocessors: {
      'test/index.js' : ['webpack']
    },

    webpack: webpackCfg,
  
    webpackMiddleware: {
      stats: 'errors-only',
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}
