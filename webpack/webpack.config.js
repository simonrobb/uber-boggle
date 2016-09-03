const path = require('path');
const options = {
  srcPath: path.join(__dirname, '../src'),
  nodeModulesPath: path.join(__dirname, '../node_modules'),
  indexHtmlPath: path.join(__dirname, '../index.html'),
  faviconPath: path.join(__dirname, '../favicon.png'),
  buildPath: path.join(__dirname,'../build'),
  isDev: process.env.NODE_ENV !== "production"
}

if (options.isDev) {
  module.exports = require('./webpack.config.dev')(options)
} else {
  module.exports = require('./webpack.config.prod')(options)
}