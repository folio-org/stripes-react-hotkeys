import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import path from 'path';

export default {
  input: 'lib/index.js',

  output: {
    exports: 'named',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React'
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
    babel({
      exclude: 'node_modules/**'
    }),

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
