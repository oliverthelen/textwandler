const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const actionFunctions = fs.readFileSync(
    path.resolve(__dirname, './src/monaco-extra-libs/action-functions.d.ts'),
    'utf8'
);
const lodash = [
    'index',
    'common',
    'array',
    'collection',
    'date',
    'function',
    'lang',
    'math',
    'number',
    'object',
    'seq',
    'string',
    'util'
].reduce((result, key) => {
    const fileContent = fs.readFileSync(
        path.resolve(
            __dirname,
            `./node_modules/@types/lodash/${key === 'index' ? '' : 'common/'}${key}.d.ts`
        ),
        'utf8'
    );
    result[key] = fileContent;
    return result;
}, {});

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
            WEBPACK_MODE: JSON.stringify(argv.mode ?? 'production'),
            ACTION_FUNCTIONS: JSON.stringify(actionFunctions),
            LODASH: JSON.stringify(lodash)
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
