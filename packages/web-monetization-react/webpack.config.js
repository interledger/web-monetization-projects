'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const TRANSPILE_ONLY = Boolean(process.env.TS_LOADER_TRANSPILE_ONLY)

module.exports = {
  mode: process.env.BUILD_ENV || 'development',

  entry: {
    'web-monetization-react': ['./src/index.ts']
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
    }
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
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
