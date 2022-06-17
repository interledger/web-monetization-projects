import { IncomingMessage } from 'http'

import * as webpack from 'webpack'
import ws from 'ws'

// eslint-disable-next-line no-console
const dbg = console.log.bind(console, 'ReloadServerPlugin: ')
const port = 4444

export class WebSocketServer extends ws.WebSocketServer {
  shouldHandle(request: IncomingMessage): boolean | Promise<boolean> {
    dbg('shouldHandle', request.url)
    return super.shouldHandle(request)
  }
}

/**
 * TODO: Shouldn't a client reload when it's been loaded and then ...
 *       need a reconnecting websocket
 */
export class ReloadServerPlugin {
  apply(compiler: webpack.Compiler) {
    if (!compiler.options.watch) {
      return
    }

    dbg(`Starting server on port ${port}`)
    const server = new WebSocketServer({ port: port })
    const name = 'ReloadServerPlugin'
    compiler.hooks.assetEmitted.tap(name, (arg, arg2) => {
      dbg('asset emitted', arg, arg2)
    })
    compiler.hooks.emit.tap(name, arg1 => {})
    // This is emitted after the whole set of files is emitted
    // This is also done when
    compiler.hooks.done.tap(name, stats => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      server.clients.forEach(ws => {
        if (ws.readyState === ws.OPEN) {
          ws.send(
            JSON.stringify({
              command: 'reload',
              data: {}
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
