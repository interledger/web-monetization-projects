// FROM UPKEEP TEMPLATE
module.exports = {
  ...require('../../jest.config'),
  testMatch: [
    '<rootDir>/test/jest/**/*.test.ts?(x)',
    '<rootDir>/src/**/*.test.ts?(x)'
  ]
}
