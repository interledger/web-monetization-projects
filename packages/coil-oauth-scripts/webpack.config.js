'use strict'

const path = require('path')
const PnpPlugin = require('pnp-webpack-plugin')
const webpack = require('webpack')

const TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

console.log({ TRANSPILE_ONLY })
module.exports = {
  mode: process.env.BUILD_ENV || 'development',

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
      events: require.resolve('events/'),
    },
    extensions: ['.ts', '.js'],
    plugins: [/*PnpPlugin*/]
  },
  resolveLoader: {
    plugins: [
      // PnpPlugin.moduleLoader(module),
      // new webpack.ProvidePlugin({
      //   process: ['process']
      // }),
    ]
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
  },

  node: {
    // console: true,
    // fs: 'empty',
    // net: 'empty',
    // tls: 'empty'
  }
}
