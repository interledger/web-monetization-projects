// FROM UPKEEP TEMPLATE
// Jest will look for a babel config in the
// same directory as the jest.config.js
console.log('HELLO from BABELRC.js')
module.exports = {
  ...require('../../babel.config')
}
