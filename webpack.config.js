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
    ],
    alias: {
      process: 'process/browser.js'
    }
  },
  devServer: {
    contentBase: './test/bundle'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RTL_SKIP_AUTO_CLEANUP': true
    })
  ],
  node: false
};

module.exports = config;
