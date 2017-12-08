#! /usr/bin/env node

const path = require('path');

const file = process.argv.pop();

process.argv.push('--config', path.resolve(__dirname, 'webpack.config.js'));

process.env.vueDevApp = path.resolve(file);

require('webpack-dev-server/bin/webpack-dev-server');
