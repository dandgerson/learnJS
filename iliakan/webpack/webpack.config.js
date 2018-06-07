'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './home',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'build.js',
        library: 'home'
    },
    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    );
}