import * as pathMod from 'path'

import { cmd } from '../utils/cmd'
import { fromRoot, getPackages, readFileJSON } from '../utils'
import { NcuRcJson } from '../types'

const log = console.log

export function doCheckUpdates() {
  const subPackages = getPackages({ withDependencies: false })
  const paths = [fromRoot('.')].concat(subPackages.map(li => li.location))

  const lines = ['feat: update dependencies', '']
  paths.forEach(path => {
    const packageFolder = pathMod.basename(path)
    const ncurc = readFileJSON<NcuRcJson>(pathMod.join(path, '.ncurc.json'))
    log('Checking for updates for', packageFolder, 'rejecting', ncurc.reject)
    const upgraded = JSON.parse(cmd('npx ncu -u --jsonUpgraded', { cwd: path }))
    // * coil-extension: @types/puppeteer: ^1.19.0
    Object.keys(upgraded).forEach(k => {
      lines.push(`* ${packageFolder}: ${k}: ${upgraded[k]}`)
    })
  })
  log(lines.join('\n'))

  log('running yarn')
  cmd('yarn', { cwd: fromRoot('.') })
  log('yarn complete')
}
