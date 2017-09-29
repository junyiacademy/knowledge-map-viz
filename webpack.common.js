const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.jsx',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'dist'),
                ],
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        [
                            'env',
                            {
                                "chrome": 52,
                                "browsers": ["last 2 versions", "safari 7"]
                            }
                        ]
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
};
