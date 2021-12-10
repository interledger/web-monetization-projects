// FROM UPKEEP TEMPLATE
module.exports = {
  ...require('../../jest.config'),
  testMatch: ['<rootDir>/test/jest/**/*.test.[jt]s?(x)'],

  // coverage
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'results/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    // additional directories not under "src"
    'assets/**/*.{js,jsx,ts,tsx}',
    'polyfills/**/*.{js,jsx,ts,tsx}'
  ]
}
