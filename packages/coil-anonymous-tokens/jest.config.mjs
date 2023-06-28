// FROM UPKEEP TEMPLATE
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const config = require('./jest.config.cjs')



const pattern = process.env.PROJECT_JEST ?? '.mts'
const withQuestion = `${pattern}?`

config.extensionsToTreatAsEsm = ['.mts']
config.moduleFileExtensions.push('mts')
config.displayName += '-esm'
config.testMatch =
  config.testMatch.map(tm => tm.replace('.ts?', withQuestion))

export default config
