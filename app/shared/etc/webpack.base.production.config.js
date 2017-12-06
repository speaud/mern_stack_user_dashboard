const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = env => {
const IS_PRODUCTION = (env.NODE_ENV == 'production') ? true : false;

  const webpackConfig = {
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch', // Required for HotModuleReplacementPlugin
      './client/src/index.js'
    ],
    /*entry: {
    application: [
    'babel-polyfill',
    'react-hot-loader/patch', // Required for HotModuleReplacementPlugin
    './client/src/index.js'
    ],
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux']
    },*/        
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
        /*+         test: /\.(csv|tsv)$/,
        +         use: [
        +           'csv-loader'
        +         ]
        +       },
        +       {
        +         test: /\.xml$/,
        +         use: [
        +           'xml-loader'
        +         ]
        +       }*/                
      ]
    },
    devServer: {
      contentBase: './client/public',
      open: true,
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
    devtool: (IS_PRODUCTION) ? 'source-map' : 'eval',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
        'NODE_ENV': JSON.stringify(env.NODE_ENV)
      }
      }),
      /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
      }),*/
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new UglifyJSPlugin(/* No need to enable Parallelization or chucking yet */)    
    ]
  }

  if (IS_PRODUCTION) {
      // Generate the index.html for production builds - follows webpackConfig.output.path value
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      title: 'Title',
      minify: {
        decodeEntities: true,
        useShortDoctype: true
      }
    }))
  } else {
    // Since HMR is only enabled in development mode, see ../index.js,
    // we want to be able to see the relative path and names of the modules when HMR reloads
    webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
  }

  return webpackConfig
};