var path = require('path');
const cfg = require('karma').config;

module.exports = function(config) {
  let cliConfig = {
    customLaunchers: {
      // Custom launcher for CI
      ChromeHeadlessDocker: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-web-security'
        ]
      },
      ChromeDocker: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-web-security'
        ]
      }
    },

    junitReporter: {
      outputDir: 'artifacts/runTest',
      useBrowserName: true,
    },

    coverageIstanbulReporter: {
      dir: 'artifacts/coverage',
      reports: ['text-summary', 'lcov'],
      thresholds: {
        // Thresholds under which karma will return failure
        // Modules are expected to define their own values in karma.conf.js
        global: {},
        each: {},
      }
    },

    reporters: [
      'mocha',
      'coverage-istanbul'
    ],

    singleRun: true,
  };

  config.set(
    cfg.parseConfig(path.resolve('./karma.conf.js'),
    cliConfig
    )
  );
};

