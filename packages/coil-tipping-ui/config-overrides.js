const {
  override,
  removeModuleScopePlugin,
  addWebpackAlias
} = require('customize-cra')

module.exports = function (config) {
  const overridden = override(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    addWebpackAlias(require('../../webpack.tsconfig.aliases')),
    removeModuleScopePlugin()
  )(config)
  // console.log(JSON.stringify(overridden, null, 2))
  // console.log('rules', overridden.module.rules[1].oneOf.length)
  overridden.module.rules[1].oneOf.forEach((one, ix) => {
    // console.log('overriding', JSON.stringify(one))
    // so can compile other packages
    if (one.include && one.include.endsWith('coil-tipping-ui/src')) {
      one.include = one.include.replace(/\/coil-tipping-ui\/src$/, '')
      // console.log('overriding', JSON.stringify(one, null, 2))
    }
    if (JSON.stringify(one).includes('coil-tipping-ui/src')) {
      // console.log('needs overriding', ix, JSON.stringify(one, null, 2))
    }
  })
  // process.exit(1)
  return overridden
}
