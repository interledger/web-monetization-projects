const { parse: parseJSON } = require('JSON2016/JSON2016.js')
const { readFileSync, existsSync } = require('fs')
const { resolve } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

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
  testMatch: ['<rootDir>/packages/*/test/jest/**/*.test.[jt]s?(x)'],
  // TODO: remove following line
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/coil-oauth-scripts/'
  ],
  testEnvironment: 'jsdom',
  rootDir: '.',
  moduleNameMapper,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json'],
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

  // coverage
  // coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  // coverageDirectory: 'results/coverage',
  // collectCoverageFrom: [
  //   // every top level "src" directory under packages
  //   'packages/coil-extension/src/**/*.{js,jsx,ts,tsx}',
  //   // additional directories not under "src"
  //   'packages/coil-extension/assets/**/*.{js,jsx,ts,tsx}',
  //   'packages/coil-webpack-utils/polyfills/**/*.{js,jsx,ts,tsx}',
  //   // Exclude test packages
  //   '!packages/coil-puppeteer-utils/**'
  // ]
}

const localConfPath = `${__dirname}/jest.config.local.js`
const localConf = existsSync(localConfPath) ? require(localConfPath) : {}
if (typeof localConf === 'function') {
  config = localConf(config)
}

module.exports = config
