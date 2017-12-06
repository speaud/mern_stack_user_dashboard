const
	DashboardPlugin = require('webpack-dashboard/plugin'),
	webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
	plugins: [
		new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]    
};