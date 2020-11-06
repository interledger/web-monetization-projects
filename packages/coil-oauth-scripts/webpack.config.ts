import path from 'path'

import webpack from 'webpack'
import { configureNodePolyfills } from '@coil/webpack-utils'

const TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

module.exports = configureNodePolyfills({
  mode: (process.env.BUILD_ENV ||
    'development') as webpack.Configuration['mode'],

  entry: {
    'coil-oauth-wm': ['./src/bundle.ts']
  },

  output: {
    filename: '[name].js',
    path: process.env.OUTPUT_TO || path.resolve(__dirname, 'build'),
    libraryTarget: 'umd'
  },

  resolve: {
    alias: {
      ...(TRANSPILE_ONLY ? require('../../webpack.tsconfig.aliases') : {})
    },
    fallback: {
      process: require.resolve('process/browser'),
      assert: require.resolve('assert/'),
      events: require.resolve('events/')
    },
    extensions: ['.ts', '.js'],
    plugins: []
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
              transpileOnly: TRANSPILE_ONLY,
              projectReferences: !TRANSPILE_ONLY,
              configFile: TRANSPILE_ONLY
                ? `${__dirname}/test/tsconfig.json`
                : `${__dirname}/tsconfig.build.json`
            }
          }
        ]
      }
    ]
  }
})
