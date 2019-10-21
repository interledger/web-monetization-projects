// FROM UPKEEP TEMPLATE
module.exports = {
  ...require('../../jest.config'),
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/jest/**/*.test.[jt]s?(x)']
}
