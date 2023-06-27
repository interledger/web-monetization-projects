import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { parse as parseJSON } from 'JSON2016/JSON2016.js'
import { pathsToModuleNameMapper } from 'ts-jest'

const SKIP_LIB_CHECK = Boolean(
  process.env.TS_JEST_COMPILER_OPTIONS_SKIP_LIB_CHECK
)
const ISOLATED_MODULES = Boolean(process.env.TS_JEST_ISOLATED_MODULES)
const MAP_PATHS_TO_MODULES =
  process.env.TS_JEST_MAP_PATHS_TO_MODULES !== 'false'

const ROOT = dirname(fileURLToPath(import.meta.url))
const tsConfig = resolve(ROOT, 'tsconfig.json')
const { compilerOptions } = parseJSON(
  readFileSync(tsConfig, { encoding: 'utf8' })
)
const pathsToModuleNames = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `${ROOT}/`
})

const moduleNameMapper = MAP_PATHS_TO_MODULES ? pathsToModuleNames : undefined

let config = {
  preset: 'ts-jest',
  projects: ['<rootDir>/packages{-archived,}/*/jest.config.{mjs,js}'],
  testEnvironment: `${ROOT}/commands/jest/jsdomWithFetchEnv.js`,
  rootDir: '.',
  moduleNameMapper,
  resolver: `${ROOT}/commands/jest/resolver.js`,
  moduleFileExtensions: ['js', 'mts', 'ts', 'tsx', 'jsx', 'json'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  setupFiles: [ROOT + '/commands/jest/loadReflection.js'],
  globals: {
    'ts-jest': {
      compilerOptions: {
        // Speed up typechecks
        skipLibCheck: SKIP_LIB_CHECK
      },
      isolatedModules: ISOLATED_MODULES,
      diagnostics: false
    }
  }
}

const localConfPath = `${ROOT}/jest.config.local.cjs`
const localConf = existsSync(localConfPath) ? await import(localConfPath) : {}
if (typeof localConf === 'function') {
  config = localConf(config)
}

export default config
