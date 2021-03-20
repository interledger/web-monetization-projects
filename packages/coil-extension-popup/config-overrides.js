const {
  override,
  removeModuleScopePlugin,
  addWebpackAlias,
  disableEsLint
} = require('customize-cra')

module.exports = function (config) {
  const overridden = override(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    addWebpackAlias(require('../../webpack.tsconfig.aliases')),
    removeModuleScopePlugin(),
    disableEsLint()
  )(config)
  require('fs').writeFileSync('overridden.json', JSON .stringify(overridden, null, 2))
  // process.exit(1)
  overridden.module.rules[1].oneOf.forEach((one, ix) => {
    // so can compile other packages
    if (one.include && one.include.endsWith('coil-extension-popup/src')) {
      one.include = one.include.replace(/\/coil-extension-popup\/src$/, '')
    }
  })
  return overridden
}
