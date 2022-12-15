import * as path from 'path'
import * as process from 'process'
import { createHash } from 'crypto'
import fs from 'fs'

import * as webpack from 'webpack'
import { Configuration } from 'webpack'
import {
  configureNodePolyfills,
  getPackageVersion,
  PackageVersion
} from '@coil/webpack-utils'

import {
  MV3,
  PRODUCTION,
  TS_LOADER_TRANSPILE_ONLY,
  WEXT_BUILD_CONFIG
} from './env'
import { makeDefinePlugin } from './defines'
import { getPaths } from './paths'
import { AfterDoneShellCommandPlugin } from './afterDoneShellCommandPlugin'
import { makeEntry } from './entries'
import { makeTsLoader } from './tsloader'
import { makeCopyToDistPattern } from './copyToDist'
import { ReloadServerPlugin } from './reloadServer'
import { MakeWebpackConfigParams, Polyfill } from './types'
import { transformManifest } from './transformManifest'
import { ManifestAny } from './types/manifest'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VWM = require('webpack-virtual-modules')

function patchAndHashPolyFill(
  manifest: ManifestAny,
  packageVersion: PackageVersion,
  polyfill?: MakeWebpackConfigParams['polyfill']
): Polyfill | undefined {
  if (polyfill) {
    if (polyfill.patch) {
      polyfill = polyfill.patch(
        manifest,
        polyfill,
        packageVersion,
        WEXT_BUILD_CONFIG
      )
    }
    const data = Buffer.from(polyfill.content, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const polyfillHash = `sha256-${digest.toString('base64')}`
    return {
      name: polyfill.name,
      content: polyfill.content,
      hash: polyfillHash
    }
  } else {
    return undefined
  }
}

export function makeWebpackConfig({
  rootDir,
  polyfill: polyfillOption
}: MakeWebpackConfigParams): Configuration {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = getPaths(rootDir)
  const packageVersion = getPackageVersion(paths.PACKAGE_JSON)
  const manifest = transformManifest(
    JSON.parse(fs.readFileSync(rootDir + '/manifest.json').toString())
  )
  const polyfill = patchAndHashPolyFill(
    manifest,
    packageVersion,
    polyfillOption
  )
  const mode = PRODUCTION ? 'production' : 'development'

  const config: webpack.Configuration = {
    mode: mode,
    experiments: {
      // asyncWebAssembly: true,
      syncWebAssembly: true
    },
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
      makeDefinePlugin(packageVersion, polyfill),
      new CopyPlugin({ patterns: makeCopyToDistPattern(polyfill) }),
      new AfterDoneShellCommandPlugin()
    ],

    output: {
      filename: '[name].js',
      path: path.join(rootDir, process.env.OUTPUT_TO || 'dist'),
      publicPath: '',
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
