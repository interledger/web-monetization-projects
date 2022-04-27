import * as path from 'path'

import foxr from 'foxr'

const dbg = console.log

export async function main() {
  dbg('Connecting to firefox (make sure it was launched with --marionette flag')
  const browser = await foxr.connect()
  const isTemporary = true
  const extensionPath = path.resolve(__dirname, '../../dist')
  dbg(`Loading extension from path ${extensionPath}`)
  await browser.install(extensionPath, isTemporary)
  dbg('Extension installed')
  await browser.disconnect()
  dbg('Foxr disconnected')
}

main().catch(console.error)
