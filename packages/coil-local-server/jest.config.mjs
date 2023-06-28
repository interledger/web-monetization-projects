// FROM UPKEEP TEMPLATE
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const config = require('./jest.config.cjs')

config.extensionsToTreatAsEsm = ['.mts']
config.moduleFileExtensions.push('mts')
config.displayName += '-esm'
config.testMatch =
  config.testMatch.map(tm => tm.replace('.ts?', '.mts?'))

export default config
