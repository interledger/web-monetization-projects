// FROM UPKEEP TEMPLATE
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const config = require('./jest.config.cjs')

const withoutTag = config.displayName.slice(0, config.displayName.length - 4)

config.moduleFileExtensions.push('mts')
config.extensionsToTreatAsEsm = ['.mts']
config.displayName = withoutTag + '-esm'
config.testMatch =
  config.testMatch.map(tm => tm.replace('.ts?', '.mts?'))

export default config
