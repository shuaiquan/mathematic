const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
    mode: isProd ? 'production' : 'development',

    entry: path.resolve(__dirname, './src/index.tsx'),

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9000,
        hot: true,
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        // for HMR
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ]
    }
}

module.exports = webpackConfig;
