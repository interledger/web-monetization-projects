/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path'

import * as webpack from 'webpack'
import { configureNodePolyfills } from '@coil/webpack-utils'

const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = __dirname

// Can cut build times down from 30s to 10s on some machines
const TS_LOADER_TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

// This is extended from the root IDE config
const TEST_TSCONFIG = path.join(ROOT_DIR, '/test/tsconfig.json')
const TSCONFIG_DEBUG_JSON = path.join(ROOT_DIR, 'tsconfig.debug.json')
const TSCONFIG_BUILD_JSON = path.join(ROOT_DIR, 'tsconfig.build.json')

// eslint-disable-next-line no-nested-ternary
const TSCONFIG = TS_LOADER_TRANSPILE_ONLY
  ? TEST_TSCONFIG
  : process.env.TSCONFIG_DEBUG
  ? TSCONFIG_DEBUG_JSON
  : TSCONFIG_BUILD_JSON

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    index: './src/test.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.join(ROOT_DIR, 'dist'),
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      ...(TS_LOADER_TRANSPILE_ONLY
        ? require('../../webpack.tsconfig.aliases')
        : {})
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: 'blocking',
      template: './test/fixtures/test.html',
      filename: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // We must use require.resolve in the mono repo with
            // deduplicated dependencies
            loader: require.resolve('ts-loader'),
            // Do not check types in watch mode
            options: TS_LOADER_TRANSPILE_ONLY
              ? {
                  configFile: TSCONFIG,
                  projectReferences: false,
                  transpileOnly: true,
                  compilerOptions: process.env.TSCONFIG_DEBUG
                    ? require(TSCONFIG_DEBUG_JSON).compilerOptions
                    : {}
                }
              : {
                  configFile: TSCONFIG,
                  projectReferences: true
                }
          }
        ]
      }
    ]
  }
}

export = configureNodePolyfills(config)
