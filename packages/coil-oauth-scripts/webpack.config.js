'use strict'

const TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

module.exports = {
  mode: process.env.BUILD_ENV || 'development',

  entry: {
    'coil-oauth-wm': ['./src/bundle.ts']
  },

  output: {
    filename: 'build/[name].js',
    path: __dirname,
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      ...(TRANSPILE_ONLY ? require('../../webpack.tsconfig.aliases') : {})
    }
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
              transpileOnly: TRANSPILE_ONLY,
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
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
