import * as fs from 'fs'

import { logErr } from '../utils/log'
import { fromRoot, writeFileJSON } from '../utils'
import { PackageJSON } from '../types'
import { cmd } from '../utils/cmd'
import { loadWorkspacePackages } from '../utils/loadWorkspaces'

import { doUpKeep } from './doUpKeep/doUpKeep'

export async function doNewPackage(): Promise<void> {
  const args = process.argv.slice(2)
  if (args.length) {
    const subPackages = await loadWorkspacePackages(fromRoot('.'))
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
    cmd('yarn')
  } else {
    logErr(
      'expecting namespaced package name as first arg, and dependencies as subsequent args'
    )
  }
}
