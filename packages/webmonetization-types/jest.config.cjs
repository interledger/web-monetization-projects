// FROM UPKEEP TEMPLATE
const path = require('path')

const displayName = path.basename(__dirname)
const rootConfig = { ...require('../../jest.config.cjs') }
delete rootConfig.projects
delete rootConfig.rootDir

const coverage = {
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'results/coverage',
}
const PROJECT_JEST = Boolean(process.env.PROJECT_JEST)

module.exports = {
  ...rootConfig,
  displayName: displayName + '-cjs',
  ...(PROJECT_JEST ? coverage : undefined),
  testMatch: [
    '<rootDir>/test/jest/**/*.test.ts?(x)',
    '<rootDir>/src/**/*.test.ts?(x)'
  ]
}
