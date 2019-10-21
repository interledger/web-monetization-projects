import * as fs from 'fs'

import { logErr } from '../utils/log'
import { fromRoot, getPackages, writeFileJSON } from '../utils'
import { PackageJSON } from '../types'
import { cmd } from '../utils/cmd'

import { doUpKeep } from './doUpKeep/doUpKeep'

export function doNewPackage(): void {
  const args = process.argv.slice(2)
  if (args.length) {
    const subPackages = getPackages()
    const fullName = args[0]
    const [atNameSpace, packageName] = fullName.split('/')
    const namespace = atNameSpace.slice(1) // @($namespace)
    const folder = fromRoot(`packages/${namespace}-${packageName}`)
    fs.mkdirSync(fromRoot(folder))

    const packageJSON: PackageJSON = {
      name: fullName,
      dependencies: {}
    }

    // Add the referenced subpackages
    subPackages.forEach((li): void => {
      if (
        packageJSON.dependencies &&
        args.includes(li.name) &&
        li.name !== fullName
      ) {
        packageJSON.dependencies[li.name] = li.version
      }
    })
    writeFileJSON(`${folder}/package.json`, packageJSON)
    doUpKeep()
    cmd('npx lerna bootstrap')
  } else {
    logErr(
      'expecting namespaced package name as first arg, and dependencies as subsequent args'
    )
  }
}
