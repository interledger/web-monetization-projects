// FROM UPKEEP TEMPLATE
module.exports = {
  ...require('./jest.config.cjs'),
  testMatch: ['<rootDir>/test/jest-e2e/**/*.test.[jt]s?(x)']
}
