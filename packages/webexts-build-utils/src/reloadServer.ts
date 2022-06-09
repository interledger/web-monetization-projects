import { IncomingMessage } from 'http'

import * as webpack from 'webpack'
import ws from 'ws'

// eslint-disable-next-line no-console
const dbg = console.log.bind(console, 'ReloadServerPlugin: ')

export class WebSocketServer extends ws.WebSocketServer {
  shouldHandle(request: IncomingMessage): boolean | Promise<boolean> {
    dbg('shouldHandle', request.url)
    return super.shouldHandle(request)
  }
}

export class ReloadServerPlugin {
  apply(compilation: webpack.Compilation) {
    const port = 4444
    dbg(`Starting server on port ${port}`)
    const server = new WebSocketServer({ port: port })
    ;(compilation.hooks as any).afterEmit.tap('ReloadServerPlugin', () => {
      dbg('after emit')
      server.clients.forEach(ws => {
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ command: 'reload' }))
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
