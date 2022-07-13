import { Reloader } from './mv3/reloader'

// These required "yarn patch"ing in order to work
// The crypto object simply needs to be retrieved from "self" rather
// than "window".
import 'ilp-protocol-stream'
import 'ilp-plugin-btp'
import { BUILD_CONFIG, VERSION } from '../webpackDefines'

export const dbg = console.log.bind('ServiceWorker')
dbg('backgroundMV3.ts')
dbg('typeof self.localStorage', self.localStorage)

const reloader = new Reloader(chrome, console.log.bind(console, 'Reloader: '))
reloader.connect()

dbg(BUILD_CONFIG)
dbg(VERSION)
