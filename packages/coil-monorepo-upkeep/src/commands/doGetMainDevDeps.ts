import { cmd } from '../utils/cmd'
import { fromRoot, readPackageJSON, writeFileJSON } from '../utils'
import { PackageJSON } from '../types'

const dbg = console.log

export function doGetMainDevDeps() {
  const root = fromRoot('.')
  const rootPkgJSONPath = fromRoot('package.json')
  const thisBranch = readPackageJSON(rootPkgJSONPath)

  const result = cmd('git show origin/main:package.json', { cwd: root })
  const mainPackageJSON: PackageJSON = JSON.parse(result)

  const devDependencies = mainPackageJSON.devDependencies
  if (devDependencies) {
    Object.entries(devDependencies).forEach(([k, v]) => {
      if (thisBranch.devDependencies) {
        const originalValue = thisBranch.devDependencies[k]
        if (originalValue != v) {
          dbg('updating', k, 'to', v, 'from', originalValue)
        }
        thisBranch.devDependencies[k] = v
      }
    })
  }

  writeFileJSON(rootPkgJSONPath, thisBranch)
}
