#!npx ts-node
import { doUpKeep } from '../commands/doUpKeep/doUpKeep'

// eslint-disable-next-line no-console
doUpKeep().catch(console.error)
