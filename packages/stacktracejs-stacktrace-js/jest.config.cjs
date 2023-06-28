// FROM UPKEEP TEMPLATE
const path = require('path')

const displayName = path.basename(__dirname)
const rootConfig = { ...require('../../jest.config.cjs') }
delete rootConfig.projects
delete rootConfig.rootDir

const coverage = {
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'results/coverage'
}

// Set this when invoked from a workspace, rather than root
const PROJECT_JEST = Boolean(process.env.PROJECT_JEST)
const E2E = Boolean(process.env.JEST_E2E)

const testFolder = E2E ? 'jest-e2e' : 'jest'
const testFolderTests = `<rootDir>/test/${testFolder}/**/*.test.ts?(x)`
const srcFolderTests = '<rootDir>/src/**/*.test.ts?(x)'

module.exports = {
  ...rootConfig,
  displayName: displayName,
  ...(PROJECT_JEST ? coverage : undefined),
  testMatch: E2E ? [testFolderTests] : [testFolderTests, srcFolderTests]
}
