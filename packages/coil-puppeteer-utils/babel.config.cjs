// FROM UPKEEP TEMPLATE
// Jest will look for a babel config in the
// same directory as the jest.config.cjs
// eslint-disable-next-line import/no-default-export
const root = require('../../babel.config.cjs')

// eslint-disable-next-line import/no-default-export
module.exports = {
  ...root
}

