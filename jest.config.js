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
  testMatch: [
    '<rootDir>/packages/*/src/**/*.test.ts?(x)',
    '<rootDir>/packages/*/test/jest/**/*.test.ts?(x)'
  ],
  testEnvironment: 'jsdom',
  rootDir: '.',
  moduleNameMapper,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  globals: {
    'ts-jest': {
      compilerOptions: {
        // Speed up typechecks
        skipLibCheck: SKIP_LIB_CHECK
      },
      isolatedModules: ISOLATED_MODULES,
      diagnostics: false
    }
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'results/coverage'
}

const localConfPath = `${__dirname}/jest.config.local.js`
const localConf = existsSync(localConfPath) ? require(localConfPath) : {}
if (typeof localConf === 'function') {
  config = localConf(config)
}

module.exports = config
