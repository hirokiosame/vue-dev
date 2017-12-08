const webpack = require('webpack');
const path = require('path');

module.exports = {

	// context: process.cwd(),
	context: __dirname,//process.cwd(),

	entry: {
		'dev-script': './server/dev-script',
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js',
		},
	},

	output: {
		filename: '[name].js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		],
	},

	devServer: {

		// disableHostCheck: publicMode,

		hot: true,

		contentBase: [
			path.resolve(__dirname, 'server'),
		],

		publicPath: '/',
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
};
