import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const config = require('./jest.config.cjs')

config.extensionsToTreatAsEsm = ['.ts', '.mts']
config.moduleFileExtensions.push('mts')
config.testMatch = config.testMatch.concat(
  config.testMatch.map( tm => tm.replace('.ts?', '.mts?')))

export default config
