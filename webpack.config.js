const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'react-hot-loader/patch'
  ],
  output: {
    path: path.resolve(__dirname, 'test/bundle'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './test/bundle'
  }
};

module.exports = config;