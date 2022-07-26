import { Reloader } from './mv3/reloader'

// These required "yarn patch"ing in order to work
// The crypto object simply needs to be retrieved from "self" rather
// than "window".
import 'ilp-protocol-stream'
import 'ilp-plugin-btp'

export const dbg = console.log.bind('ServiceWorker')
dbg('backgroundMV3.ts')
dbg('typeof self.localStorage', self.localStorage)

const reloader = new Reloader(chrome, console.log.bind(console, 'Reloader: '))
reloader.connect()

type RunAt = 'document_start' | 'document_end' | 'document_idle'
type ExecutionWorld = 'ISOLATED' | 'MAIN'

interface RegisteredContentScript {
  id: string
  allFrames?: boolean
  css?: string[]
  excludeMatches?: string[]
  js?: string[]
  matches?: string[]
  persistAcrossSessions?: boolean // default true
  runAt?: RunAt
  world?: ExecutionWorld
}

interface ContentScriptFilter {
  ids: string[]
}

interface ChromeScripting {
  registerContentScripts(
    scripts: RegisteredContentScript[],
    callback?: (error?: Error) => void
  ): Promise<void>

  getRegisteredContentScripts(
    filter?: ContentScriptFilter,
    callback?: (scripts: RegisteredContentScript) => void
  ): Promise<RegisteredContentScript[]>
}

const scripting = chrome.scripting as unknown as ChromeScripting

scripting
  .registerContentScripts([
    {
      matches: ['https://*/*', 'http://*/*'],
      id: 'wm-polyfill.js',
      world: 'MAIN',
      js: ['wm-polyfill.js'],
      runAt: 'document_start'
    }
  ])
  .catch(console.error)

scripting
  .getRegisteredContentScripts()
  .then(console.log.bind(console, 'getRegisteredContentScripts'))

import './background'
