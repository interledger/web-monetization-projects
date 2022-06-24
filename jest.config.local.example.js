module.exports = config => {
  delete config.preset
  delete config.transform
  return config
}
