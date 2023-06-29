/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, existsSync } = require('fs')
const { resolve } = require('path')

const { parse: parseJSON } = require('JSON2016/JSON2016.js')
const { pathsToModuleNameMapper } = require('ts-jest')

const SKIP_LIB_CHECK = Boolean(
  process.env.TS_JEST_COMPILER_OPTIONS_SKIP_LIB_CHECK
)
const ISOLATED_MODULES = Boolean(process.env.TS_JEST_ISOLATED_MODULES)
const MAP_PATHS_TO_MODULES =
  process.env.TS_JEST_MAP_PATHS_TO_MODULES !== 'false'

const tsConfig = resolve(__dirname, 'tsconfig.json')
const { compilerOptions } = parseJSON(
  readFileSync(tsConfig, { encoding: 'utf8' })
)
const pathsToModuleNames = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `${__dirname}/`
})

const moduleNameMapper = MAP_PATHS_TO_MODULES ? pathsToModuleNames : undefined

let config = {
  preset: 'ts-jest',
  projects: ['<rootDir>/packages{-archived,}/*/jest.config.cjs'],
  testEnvironment: `${__dirname}/commands/jest/jsdomWithFetchEnv.js`,
  rootDir: '.',
  moduleNameMapper,
  resolver: `${__dirname}/commands/jest/resolver.js`,
  extensionsToTreatAsEsm: ['.mts'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json', 'mts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  setupFiles: [__dirname + '/commands/jest/loadReflection.js'],
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

const localConfPath = `${__dirname}/jest.config.local.cjs`
const localConf = existsSync(localConfPath) ? require(localConfPath) : {}
if (typeof localConf === 'function') {
  config = localConf(config)
}

module.exports = config
