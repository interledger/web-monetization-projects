import path from 'path'

import webpack from 'webpack'
import { configureNodePolyfills } from '@coil/webpack-utils'

const TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

module.exports = configureNodePolyfills({
  mode: (process.env.BUILD_ENV ??
    'development') as webpack.Configuration['mode'],

  entry: {
    'webmonetization-react': ['./src/index.ts']
  },

  externals: [
    // The original rollup script apparently set events as an external
    'events',
    'react',
    'react-dom'
  ],

  output: {
    filename: '[name].js',
    path: process.env.OUTPUT_TO || path.resolve(__dirname, 'build'),
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      ...(TRANSPILE_ONLY ? require('../../webpack.tsconfig.aliases') : {})
    },
    plugins: []
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
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
