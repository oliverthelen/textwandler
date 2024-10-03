const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');

module.exports = (env, argv) => ({
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: argv.mode === 'production' ? 'production' : 'development',
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        library: 'textWandler',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single',
        ...(argv.mode === 'production'
            ? {
                  minimize: true,
                  minimizer: [
                      new TerserPlugin({
                          terserOptions: {
                              compress: {
                                  unused: true,
                                  dead_code: true
                              }
                          }
                      })
                  ]
              }
            : {})
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(packageJson.version),
            WEBPACK_MODE: JSON.stringify(argv.mode ?? 'production')
        }),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript']
        }),
        new CopyPlugin({
            patterns: ['manifest.json']
        }),
        new FaviconsWebpackPlugin({
            logo: 'images/logo-710.png',
            mode: 'webapp',
            devMode: 'webapp'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        argv.mode === 'production'
            ? new WorkboxPlugin.GenerateSW({
                  clientsClaim: true,
                  skipWaiting: true,
                  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
              })
            : false
    ]
});
