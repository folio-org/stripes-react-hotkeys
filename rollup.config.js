var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify').uglify;
var license = require('rollup-plugin-license');
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

var path = require('path');
var os = require('os');

module.exports = {
  input: 'lib/index.js',

  output: {
    exports: 'named',
    globals: {
      'prop-types': 'PropTypes',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'os': 'os',
      'lodash/isEqual': 'lodash.isEqual',
      'lodash/isBoolean': 'lodash.isBoolean',
      'lodash/isArray': 'lodash.isArray',
      'lodash/omit': 'lodash.omit',
    }
  },
  
  external: [
    'prop-types',
    'react',
    'react-dom',
    'lodash/isEqual',
    'lodash/isBoolean',
    'lodash/isArray',
    'lodash/omit',
    'os',
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),

    commonjs({
      exclude: './test/HotKeys/**',
      namedExports: {
        'react-dom/test-utils' : ['act']
      }
    }),

    process.env.BABEL_ENV === 'production' && uglify(),

    process.env.NODE_ENV !== 'test' && license({
      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE.md')
        }
      }
    })
  ]
};
