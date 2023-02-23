import path from 'path'

import { Configuration } from 'webpack'
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const rootTsConfig = `${__dirname}/../../tsconfig.json`

const config: Configuration = {
  mode: 'development',
  entry: './src/bin/upkeep.ts',
  output: {
    path: process.env.OUTPUT_TO
      ? path.resolve(process.env.OUTPUT_TO)
      : path.resolve(__dirname, 'build'),
    filename: 'upkeep.js',
    libraryTarget: 'commonjs'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin({ configFile: rootTsConfig })]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              compilerOptions: {
                noEmit: false
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  target: 'node'
  // node: {
  //   __dirname: false,
  //   __filename: false
  // }
}

// eslint-disable-next-line import/no-default-export
export default config
