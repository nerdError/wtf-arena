const path = require('path');

module.exports = {
    mode: "development",
    devtool: 'eval',
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                sideEffects: true
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        library: 'Game',
        libraryTarget: 'var',

        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    }
}