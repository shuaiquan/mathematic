const path = require('path');

const webpackConfig = {
    mode: 'production',

    entry: path.resolve(__dirname, './src/index.ts'),

    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'bundle.js',
        clean: true
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
}

module.exports = webpackConfig;
