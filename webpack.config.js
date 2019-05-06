//This file contains the entry point for the webpack
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/app.js'] //Javascript which is the entry for the application
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/transform-runtime']
      }
    }]
  }
}