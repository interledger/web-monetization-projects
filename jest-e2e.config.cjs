module.exports = {
  ...require('./jest.config.cjs'),
  projects: ['<rootDir>/packages{-archived,}/*/jest-e2e.config.cjs'],
}
