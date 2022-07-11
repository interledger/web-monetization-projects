import * as fs from 'fs'
import * as pathMod from 'path'
import * as childProcess from 'child_process'

import * as webpack from 'webpack'

export const configureNodePolyfills = (wpConf: webpack.Configuration) => {
  if (!wpConf.resolve) {
    throw new Error()
  }
  wpConf.resolve.fallback = {
    ...wpConf.resolve.fallback,
    setImmediate: `${__dirname}/../polyfills/setImmediate.js`,
    process: require.resolve('process/browser'),
    string_decoder: require.resolve('string_decoder/'),
    assert: require.resolve('assert/'),
    events: require.resolve('events/'),
    crypto: require.resolve('crypto-browserify/'),
    util: require.resolve('util/'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify/')
  }
  wpConf.plugins = [
    ...(wpConf.plugins ?? []),
    new webpack.ProvidePlugin({
      process: ['process']
    }),
    new webpack.ProvidePlugin({
      setImmediate: ['setImmediate', 'setImmediate'],
      clearImmediate: ['setImmediate', 'clearImmediate']
    }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ]
  return wpConf
}

export interface PackageVersion {
  dirty: boolean
  commit: string
  version: string
  buildDateISO: string
}

export function getPackageVersion(packageJSONPath: string): PackageVersion {
  const json = fs.readFileSync(packageJSONPath)
  const parsed = JSON.parse(json.toString())
  const version = parsed.version as string
  const cwd = pathMod.dirname(packageJSONPath)
  const gitExists = fs.existsSync(`${cwd}/.git/`)
  const hash = gitExists
    ? childProcess.execSync('git rev-parse --short HEAD', { cwd })
    : ''
  const status = gitExists
    ? childProcess.execSync('git status -s', { cwd })
    : ''
  const date = new Date()

  return {
    version,
    commit: hash.toString().trim(),
    dirty: status.toString().trim().length > 0,
    buildDateISO: date.toISOString()
  }
}
