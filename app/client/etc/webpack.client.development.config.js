const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')

const webpackBaseDevelopmentConfig = require('../../shared/etc/webpack.base.development.config.js');

module.exports = merge(webpackBaseDevelopmentConfig, {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch', // Required for HotModuleReplacementPlugin
    './client/src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '../bin'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]       
      }              
    ]
  },
  devServer: {
    contentBase: './client/public',
    open: true, // Open the app in the default browser
    port: 3000,
    hot: true, // Required for HotModuleReplacementPlugin
    proxy: {
    "/api": "http://localhost:3001" // Proxy for the API express server. See ../server/server.js for more information
    },
    overlay: {
      warnings: true,
      errors: true
    },
    /*
      This will serve the 'contentBase' index.html file in place of any 404 responses,
      if this is not set then the 'react-router' package will return an error then display an empty page
    */
    historyApiFallback: true
  },
  // devtool: 'cheap-module-eval-source-map',
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});