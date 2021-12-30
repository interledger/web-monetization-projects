module.exports = config => {
  if (!process.env.IGNORE_LOCAL_JEST) {
    console.log('jest.config.local.js: Overriding typescript, and using babel')
    delete config.preset
  }
  return config
}
