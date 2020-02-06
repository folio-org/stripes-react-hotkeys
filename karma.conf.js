module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/bundled/**/*.js', watched: false }
    ],
  
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
