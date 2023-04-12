import { inject, injectable } from 'inversify'
import AbstractBtpPlugin from 'ilp-plugin-btp'
import {
  Connection,
  createServer,
  DataAndMoneyStream,
  Server
} from 'ilp-protocol-stream'
import MiniAccountsPlugin from 'ilp-plugin-mini-accounts'
import { SPSPResponse } from '@webmonetization/types'

import { dbg } from '../utils/logging'
import * as tokens from '../tokens'

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
        stream.on('money', amount => {
          dbg('incoming_money', amount)
        })
        if (process.env.QUICK_STREAM) {
          stream.setReceiveMax(Infinity)
        } else {
          let total = 20e3
          while (stream.isOpen()) {
            stream.setReceiveMax(total)
            const timeout = 250 + Math.floor(Math.random() * 250)
            await new Promise(resolve => setTimeout(resolve, timeout))
            const extra = 10e3 + Math.floor(Math.random() * 20e3)
            total += extra
            dbg({ total })
          }
        }
      })
    })
    this.streamServer.on('error', () => {
      dbg('streamServer error')
    })
  }

  async getSPSPResponse(opts: {
    connectionTag?: string
    receiptNonce?: string
    receiptSecret?: string
  }): Promise<SPSPResponse> {
    const { destinationAccount, sharedSecret, receiptsEnabled } =
      this.streamServer.generateAddressAndSecret({
        connectionTag: opts.connectionTag,
        receiptNonce: opts.receiptNonce
          ? Buffer.from(opts.receiptNonce, 'base64')
          : undefined,
        receiptSecret: opts.receiptSecret
          ? Buffer.from(opts.receiptSecret, 'base64')
          : undefined
      })
    const body: SPSPResponse = {
      destination_account: destinationAccount,
      shared_secret: sharedSecret.toString('base64'),
      receipts_enabled: receiptsEnabled
    }
    return body
  }
}
