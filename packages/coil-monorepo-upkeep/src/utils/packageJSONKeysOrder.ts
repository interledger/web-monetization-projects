export const packageJSONKeysOrder = ['$schema', '$overRideUpKeep'].concat(
  require('sort-package-json').sortOrder
)

packageJSONKeysOrder.splice(
  packageJSONKeysOrder.findIndex(s => s === 'types') + 1,
  0,
  'subpackages'
)
