var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = (options) => Object.assign(baseConfig(options), {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(options.srcPath, 'index.js')
  ],
  output: {
    path: options.buildPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: options.indexHtmlPath,
      favicon: options.faviconPath,
    }),
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify("development") 
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
      contentBase: options.srcPath
  }
})
