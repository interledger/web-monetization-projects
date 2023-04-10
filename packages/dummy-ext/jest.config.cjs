// FROM UPKEEP TEMPLATE
const path = require('path')

const displayName = path.basename(__dirname)
const rootConfig = { ...require('jest.config.cjs') }
delete rootConfig.projects
delete rootConfig.rootDir

module.exports = {
  ...rootConfig,
  displayName,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'results/coverage',
  testMatch: [
    '<rootDir>/test/jest/**/*.test.ts?(x)',
    '<rootDir>/src/**/*.test.ts?(x)'
  ]
}
