import { inspect } from 'util'
import { readFileSync, writeFileSync } from 'fs'
import * as pathModule from 'path'

import sortPackageJson from 'sort-package-json'
import JSON5 from 'json5'

import { LernaListItem, PackageJSON } from '../types'

import { packageJSONKeysOrder } from './packageJSONKeysOrder'
import { cmd } from './cmd'

//const JSON5: typeof JSON = require('json5')

export const pretty = (val: any) => inspect(val, { depth: Infinity })

export function readFileJSON<T = any>(path: string) {
  return JSON5.parse(readFileSync(path, { encoding: 'utf8' })) as T
}

export function writeFileJSON(
  path: string,
  val: any,
  opts: { prefix?: string; suffix?: string } = {}
) {
  console.log('writeFileJSON', { path })
  const { prefix = '', suffix = '' } = opts
  return writeFileSync(
    path,
    `${prefix}${JSON.stringify(val, null, 2)}
${suffix}`
  )
}

export function writePackageJSON(
  path: string,
  val: any,
  options?: { sortOrder: string[] }
) {
  const sortPackageJsonOptions = options || { sortOrder: packageJSONKeysOrder }
  return writeFileSync(
    path,
    JSON.stringify(sortPackageJson(val, sortPackageJsonOptions), null, 2) +
      // add trailing new line
      '\n'
  )
}

export function readPackageFile(packageSpec: LernaListItem, path: string) {
  const filePath = pathModule.join(packageSpec.location, path)
  return readFileSync(filePath, { encoding: 'utf8' })
}

export function readPackageJSON(path: string): PackageJSON {
  return readFileJSON(path)
}

export const fromRoot = (path: string) => {
  const monorepoRoot = process.env.MONOREPO_ROOT
  if (monorepoRoot) {
    const resolved = pathModule.resolve(monorepoRoot, path)
    console.log({ monorepoRoot, path, resolved })
    return resolved
  }
  return pathModule.resolve(__dirname, '../../../..', path)
}

export const relativeToRoot = (path: string) => {
  return pathModule.relative(fromRoot('.'), path)
}

export interface GetPackagesParameters {
  withDependencies?: boolean
}
