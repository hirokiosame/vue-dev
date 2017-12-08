#! /usr/bin/env node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const portfinder = require('portfinder');
const open = require('opn');

const config = require('./webpack.config');

const yargs = require('yargs');
const argv = yargs.options({
	port: {
		description: 'Server port',
		alias: 'p',
	},
	host: {
		description: 'Server host',
		alias: 'h',
		default: '0.0.0.0',
	},
	open: {
		type: 'boolean',
		describe: 'Open the default browser, or optionally specify a browser name',
	},
})
.help('help')
.demandCommand(1, 'You must pass in a Vue file')
.argv;


function startServer(port) {
	const [app] = argv._;
	config.resolve.alias.app = path.resolve(app);

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		contentBase: [
			path.resolve(__dirname, 'server'),
		],
		historyApiFallback: true,
	}).listen(port, argv.host, function (err) {
		if(err) {
			return console.log(err);
		}

		console.log('Listening at ' + argv.host + ':' + port);

		if (argv.open) {
			open(`http://${argv.host}:${port}`).catch(() => {
				console.log(`${openMessage}. If you are running in a headless environment, please do not use the open flag.`);
			});
		}
	});
}

if (argv.port) {
	startServer(argv.port);
} else {
	portfinder.getPort(function (err, port) {
		if (err) { throw err; }
		startServer(port);
	});	
}
