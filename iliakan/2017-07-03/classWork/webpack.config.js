'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js',
        library: 'app'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.pug$/,
                use: 'pug-loader'
            }

        ]
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 1000
    },

    devtool: 'source-map',

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};