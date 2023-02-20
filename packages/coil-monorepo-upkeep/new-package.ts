#!npx ts-node
import { doNewPackage } from './src/commands/doNewPackage'

doNewPackage().catch(console.error)
