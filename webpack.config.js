const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'test/bundle'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  devServer: {
    contentBase: './test/bundle'
  },
  node: {fs: 'empty'}
};

module.exports = config;
