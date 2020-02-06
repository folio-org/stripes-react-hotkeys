const Bundler = require('parcel-bundler');
const Server = require('karma').Server;
const runner = require('karma').runner;
const stopper = require('karma').stopper;
const kcfg = require('karma').config;
const path = require('path');

const entryFiles = path.join(__dirname, './test/index.js');

// Bundler options
const options = {
  outDir: './test/bundled', // The out directory to put the build files in, defaults to dist
  outFile: 'index',
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: false, // Enabled or disables caching, defaults to true
  contentHash: false, // Disable content hash from being included on the filename
  global: 'hotkeys_test', // Expose modules as UMD under this name, disabled by default
  target: 'browser', // Browser/node/electron, defaults to browser
  bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
  hmr: false, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  hmrHostname: '', // A hostname for hot module reload, default to ''
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: false, // Enable or disable auto install of missing dependencies found during bundling
};

// Initializes a bundler using the entrypoint location and options provided
const bundler = new Bundler(entryFiles, options);

const karmaConfig = kcfg.parseConfig(path.resolve('./karma.conf.js'));

const server = new Server(karmaConfig, function(exitCode) {
  console.log('Karma has exited with ' + exitCode)
  process.exit(exitCode)
});

server.on('browsers_ready', function (browser) {
  runner.run(karmaConfig, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
  });
});

server.on('browser_error', function (browser, error) {
  console.log('['+ browser + '] ' +'Browser error during Karma run: ' + error);
});

(async function() {
  bundler.on('bundled', () => {
    server.start();
  })

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.bundle();
})();
