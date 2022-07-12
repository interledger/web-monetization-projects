import * as path from 'path'
import * as process from 'process'

import * as webpack from 'webpack'
import { configureNodePolyfills, getPackageVersion } from '@coil/webpack-utils'
import { Configuration } from 'webpack'
import VWM from 'webpack-virtual-modules'

import { MV3, PRODUCTION, TS_LOADER_TRANSPILE_ONLY } from './env'
import { makeDefinePlugin } from './defines'
import { getPaths } from './paths'
import { AfterDoneShellCommandPlugin } from './afterDoneShellCommandPlugin'
import { makeEntry } from './entries'
import { makeTsLoader } from './tsloader'
import { makeCopyToDistPattern } from './copyToDist'
import { ReloadServerPlugin } from './reloadServer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin')

export interface MakeWebpackConfigParams {
  rootDir: string
  polyfill?: {
    content: string
    name: string
    hash: string
  }
}

export function makeWebpackConfig({
  rootDir,
  polyfill
}: MakeWebpackConfigParams): Configuration {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = getPaths(rootDir)

  const packageVersion = getPackageVersion(paths.PACKAGE_JSON)

  const mode = PRODUCTION ? 'production' : 'development'

  const config: webpack.Configuration = {
    mode: mode,
    optimization: {
      minimize: PRODUCTION
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      symlinks: true,
      // Only add these if using the TEST_TSCONFIG which transpile only implies
      alias: {
        ...(TS_LOADER_TRANSPILE_ONLY
          ? require('../../../webpack.tsconfig.aliases')
          : {})
      }
    },
    ignoreWarnings: [
      {
        message: /export .* was not found in/
      }
    ],

    devtool: PRODUCTION ? undefined : 'inline-source-map',

    entry: makeEntry(rootDir),

    plugins: [
      makeDefinePlugin(packageVersion),
      new CopyPlugin({ patterns: makeCopyToDistPattern(polyfill.hash) }),
      new AfterDoneShellCommandPlugin()
    ],

    output: {
      filename: '[name].js',
      path: path.join(rootDir, process.env.OUTPUT_TO || 'dist'),
      libraryTarget: 'umd'
    },

    module: {
      // noParse: [ /\bws$/ ],
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [makeTsLoader(paths)]
        }
      ]
    }
  }

  if (polyfill) {
    const polyfillJs = `./${polyfill.hash}.js`
    config.plugins?.push(
      new VWM({
        [polyfillJs]: polyfill.content
      })
    )
    const entry = config.entry as Record<string, string>
    entry[polyfill.name] = polyfillJs
  }

  if (MV3) {
    config.plugins?.unshift(new ReloadServerPlugin())
  }

  return configureNodePolyfills(config)
}
