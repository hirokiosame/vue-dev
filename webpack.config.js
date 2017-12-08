const webpack = require('webpack');
const path = require('path');
module.exports = {

	context: __dirname,

	entry: {
		'dev-script': './server/dev-script',
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'app': process.env.vueDevApp || '/Users/hiroki/Documents/Gits/jsfiddle-button-vue/dist/jsfiddle-btn.js',
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
