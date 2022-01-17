// require('@abraham/reflection')

module.exports = config => {
  if (!process.env.IGNORE_LOCAL_JEST) {
    // require abraham reflection
    // config.setupFiles = [__filename]
    // console.log('jest.config.local.js: Overriding typescript, and using babel')
    delete config.preset
  }
  return config
}
