import * as http from 'http'

import { inject, injectable } from 'inversify'
import MiniAccountsPlugin from 'ilp-plugin-mini-accounts'

import { THttpServer, TLogger } from '../../di/tokens'
import type { Logger } from '../../utils/logger'

@injectable()
export class BTPService {
  public plugin

  constructor(
    @inject(THttpServer)
    private server: http.Server,
    @inject(TLogger)
    private logger: Logger
  ) {
    const log = this.logger
    const serverProxy = new Proxy(this.server, {
      get(target, prop) {
        // eslint-disable-next-line prefer-rest-params
        if (prop === 'listen') {
          log('Ignoring httpServer.listen() call from BTPServer')
          return function (...args: unknown[]) {
            const lastArg = args[args.length - 1]
            if (typeof lastArg === 'function') {
              log('Invoking callback')
              lastArg()
            }
          }
        } else {
          return (target as any)[prop]
        }
      }
    })

    this.plugin = new MiniAccountsPlugin({
      debugHostIldcpInfo: {
        clientAddress: 'local.niq.test',
        assetCode: 'USD',
        assetScale: 9
      },
      allowedOrigins: ['.*'],
      generateAccount: true,
      wsOpts: {
        server: serverProxy
      }
    })
  }
}
