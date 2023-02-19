#!npx ts-node
import { doUpKeep } from './src/commands/doUpKeep/doUpKeep'

doUpKeep().catch(console.error)
