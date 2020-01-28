import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import path from 'path';

export default {
  input: 'lib/index.js',

  output: {
    exports: 'named',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      isEqual: 'lodash.isEqual',
      isBoolean: 'lodash.isBoolean',
      isArray: 'lodash.isArray',
    }
  },
  
  external: [
    'prop-types',
    'react',
    'react-dom',
    'lodash/isEqual',
    'lodash/isBoolean',
    'lodash/isArray',
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),

    commonjs(),
    
    process.env.BABEL_ENV === 'production' && uglify(),

    license({
      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE.md')
        }
      }
    })
  ]
};
