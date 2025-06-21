import pkg from 'webpack';
import { fileURLToPath } from 'url';
import { dirname, resolve as _resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import { readFileSync } from 'fs';
import { createRequire } from 'node:module';

const { DefinePlugin } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const actionFunctions = readFileSync(
    _resolve(__dirname, './src/monaco-extra-libs/action-functions.d.ts'),
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
    result[key] = readFileSync(
        _resolve(
            __dirname,
            `./node_modules/@types/lodash/${key === 'index' ? '' : 'common/'}${key}.d.ts`
        ),
        'utf8'
    );
    return result;
}, {});

export default (env, argv) => ({
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
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                include: _resolve(__dirname, 'assets')
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        library: 'textWandler',
        path: _resolve(__dirname, 'dist')
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
                                  dead_code: true,
                                  unused: true,
                                  drop_console: true, // Remove console.* calls
                                  drop_debugger: true, // Remove debugger statements
                                  passes: 2, // Run compress twice for better results
                                  pure_funcs: ['console.log'] // Treat console.log as side-effect-free
                              },
                              mangle: {
                                  toplevel: true // Mangle top-level variable and function names
                              },
                              format: {
                                  comments: false // Remove all comments
                              }
                          },
                          extractComments: false // Don’t generate separate comment files
                      })
                  ]
              }
            : {})
    },
    plugins: [
        new DefinePlugin({
            VERSION: JSON.stringify(version),
            WEBPACK_MODE: JSON.stringify(argv.mode ?? 'production'),
            ACTION_FUNCTIONS: JSON.stringify(actionFunctions),
            LODASH: JSON.stringify(lodash)
        }),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript']
        }),
        new CopyPlugin({
            patterns: ['manifest.json', { from: 'src/assets', to: 'assets' }]
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
            ? new GenerateSW({
                  clientsClaim: true,
                  skipWaiting: true,
                  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
              })
            : false
    ]
});
