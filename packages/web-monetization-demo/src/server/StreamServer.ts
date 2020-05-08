import { inject, injectable } from 'inversify'
import AbstractBtpPlugin from 'ilp-plugin-btp'
import {
  Connection,
  createServer,
  DataAndMoneyStream,
  Server
} from 'ilp-protocol-stream'
import MiniAccountsPlugin from 'ilp-plugin-mini-accounts'
import { SPSPResponse } from '@web-monetization/types'

import * as tokens from './tokens'
import { dbg } from './logging'

@injectable()
export class StreamServer {
  server!: AbstractBtpPlugin
  streamServer!: Server

  constructor(@inject(tokens.BtpPort) private port: number) {}

  async start() {
    this.server = new MiniAccountsPlugin({
      debugHostIldcpInfo: {
        clientAddress: 'local.test',
        assetCode: 'USD',
        assetScale: 9
      },
      allowedOrigins: ['.*'],
      generateAccount: true,
      wsOpts: {
        port: this.port
      }
    })
    this.streamServer = await createServer({ plugin: this.server })
    this.streamServer.on('connection', (connection: Connection) => {
      connection.on('stream', async (stream: DataAndMoneyStream) => {
        let total = 20e3
        while (stream.isOpen()) {
          stream.setReceiveMax(total)
          const timeout = 250 + Math.floor(Math.random() * 250)
          await new Promise(resolve => setTimeout(resolve, timeout))
          const extra = 10e3 + Math.floor(Math.random() * 20e3)
          total += extra
          dbg({ total })
        }
      })
    })
    this.streamServer.on('error', () => {
      dbg('streamServer error')
    })
  }

  async getSPSPResponse(opts: {
    connectionTag?: string
    receiptNonce?: Buffer
    receiptSecret?: Buffer
  }): Promise<SPSPResponse> {
    const {
      destinationAccount,
      sharedSecret,
      receiptsEnabled
    } = this.streamServer.generateAddressAndSecret({
      connectionTag: opts.connectionTag,
      receiptNonce: opts.receiptNonce,
      receiptSecret: opts.receiptSecret
    })
    const body: SPSPResponse = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      destination_account: destinationAccount,
      // eslint-disable-next-line @typescript-eslint/camelcase
      shared_secret: sharedSecret.toString('base64'),
      // eslint-disable-next-line @typescript-eslint/camelcase
      receipts_enabled: receiptsEnabled
    }
    return body
  }
}
