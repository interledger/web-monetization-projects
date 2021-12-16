module.exports = {
  ...require('./jest.config'),
  testMatch: ['<rootDir>/packages/*/test/jest-e2e/**/*.test.[jt]s?(x)']
}
