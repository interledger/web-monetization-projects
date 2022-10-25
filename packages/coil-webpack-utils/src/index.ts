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
    url: require.resolve('url/'),
    querystring: require.resolve('querystring-es3/'),
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

export type PackageVersion = {
  version: string
  buildDateISO: string
} & (
  | {
      haveGitFolder: true
      dirty: boolean
      commit: string
    }
  | {
      haveGitFolder: false
    }
)

function inGitWorkingTree(cwd: string) {
  try {
    return (
      childProcess
        .execSync('git rev-parse --is-inside-work-tree', { cwd })
        .toString('utf8')
        .trim() === 'true'
    )
  } catch (e) {
    return false
  }
}

export function getPackageVersion(packageJSONPath: string): PackageVersion {
  const json = fs.readFileSync(packageJSONPath)
  const pkg = JSON.parse(json.toString())

  const date = new Date()
  const packageDir = pathMod.dirname(packageJSONPath)
  const execOpts = { cwd: packageDir }

  const withoutGit = {
    haveGitFolder: false as const,
    version: pkg.version as string,
    buildDateISO: date.toISOString()
  }

  if (inGitWorkingTree(packageDir)) {
    const hash = childProcess.execSync('git rev-parse --short HEAD', execOpts)
    const status = childProcess.execSync('git status -s', execOpts)

    return {
      ...withoutGit,
      haveGitFolder: true,
      commit: hash.toString().trim(),
      dirty: status.toString().trim().length > 0
    }
  } else {
    return withoutGit
  }
}
