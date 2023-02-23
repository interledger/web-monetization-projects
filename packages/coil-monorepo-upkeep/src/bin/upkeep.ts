#!npx ts-node
import { doUpKeep } from '../commands/doUpKeep/doUpKeep'

doUpKeep().catch(console.error)
