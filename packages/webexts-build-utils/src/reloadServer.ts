import { IncomingMessage } from 'http'
import * as crypto from 'crypto'

import * as webpack from 'webpack'
import ws from 'ws'

import { RELOAD_SERVER_PORT } from './env'

const dbg = process.env.DBG_RELOAD_SERVER
  ? // eslint-disable-next-line no-console
    console.log.bind(console, 'ReloadServerPlugin: ')
  : // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {}

const port = RELOAD_SERVER_PORT

const sha1 = (image: Buffer) => {
  return crypto.createHash('sha1').update(image).digest().toString('hex')
}

export class WebSocketServer extends ws.WebSocketServer {
  shouldHandle(request: IncomingMessage): boolean | Promise<boolean> {
    dbg('shouldHandle', request.url)
    return super.shouldHandle(request)
  }
}

export class ReloadServerPlugin {
  hashes = new Map<string, string>()
  changed = new Set<string>()

  apply(compiler: webpack.Compiler) {
    if (!compiler.options.watch) {
      return
    }

    dbg(`starting server on port ${port}`)
    const server = new WebSocketServer({ port: port })
    const name = 'ReloadServerPlugin'
    compiler.hooks.assetEmitted.tap(name, (asset, assetInfo) => {
      const hash = sha1(assetInfo.content)
      if (!this.hashes.has(asset)) {
        this.changed.add(asset)
      } else {
        const prior = this.hashes.get(asset)
        if (prior !== hash) {
          this.changed.add(asset)
        }
      }
      this.hashes.set(asset, hash)
      dbg(`asset emitted`, asset, hash)
    })
    compiler.hooks.done.tap(name, stats => {
      console.log(
        stats.toJson()?.assets?.find(asset => asset.name === 'backgroundMV3.js')
      )
      const changed = Array.from(this.changed.values())
      this.changed.clear()
      server.clients.forEach(ws => {
        if (ws.readyState === ws.OPEN) {
          ws.send(
            JSON.stringify({
              command: 'reload',
              data: { changed }
            })
          )
        }
      })
    })
    server.on('connection', ws => {
      dbg('connection opened')
      ws.on('message', msg => {
        dbg('received message', msg.toString('utf-8'))
      })
    })
  }
}
