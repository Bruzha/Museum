const path = require('path');

        module.exports = {
            entry: './src/js/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist'),
            },
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.scss$/,
                        use:['style-loader', 'css-loader', ]
                    }
                ],
            },
        };