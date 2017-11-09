const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const IS_PRODUCTION = (env.NODE_ENV == 'production') ? true : false;

    const webpackConfig = {
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
                }
            ]
        },
        devServer: {
            contentBase: './client/public',
            open: true,
            port: 3000,
            hot: true, // Required for HotModuleReplacementPlugin
            proxy: {
                "/api": "http://localhost:3001" // Proxy for the API express server. See ../server/server.js for more information
            }
        },
        devtool: (IS_PRODUCTION) ? 'source-map' : 'eval',
        plugins: [
            new webpack.DefinePlugin({
              'process.env': {
                'NODE_ENV': JSON.stringify(env.NODE_ENV)
              }
            }),
            new webpack.HotModuleReplacementPlugin(),
            //new webpack.HotModuleReplacementPlugin({
            //    multistep: true // Build in two steps - first compiling the hot update chunks, and then the remaining normal assets
            //}),
            new UglifyJSPlugin(/* No need to enable Parallelization or chucking for an app this small */)    
        ]
    }

    if (IS_PRODUCTION) {
        // Generate the index.html for production builds - follows webpackConfig.output.path value
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            title: 'URBN Front End Code Challange',
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