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
import { b64urlDecode, b64urlEncode } from './utils/base64'

export interface BalanceRecord {
  firstPacketMs: number
  lastPacketMs: number
  balance: number
}

@injectable()
export class StreamServer {
  server!: AbstractBtpPlugin
  streamServer!: Server
  balances: Record<string, BalanceRecord> = {}

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
      if (!connection.connectionTag) {
        throw new Error('expecting requestId as connection tag')
      }
      const requestId = b64urlDecode(connection.connectionTag).toString()
      dbg('connection tag', requestId)
      connection.on('stream', async (stream: DataAndMoneyStream) => {
        stream.on('money', (amount: string) => {
          dbg(
            'received money',
            amount,
            connection.sourceAssetCode,
            connection.sourceAssetScale
          )
          const now = Date.now()
          if (typeof this.balances[requestId] !== 'object') {
            this.balances[requestId] = {
              balance: Number(amount),
              lastPacketMs: now,
              firstPacketMs: now
            }
          } else {
            this.balances[requestId].balance += Number(amount)
            this.balances[requestId].lastPacketMs = now
          }
        })
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

  async getSPSPResponse(requestId: string): Promise<SPSPResponse> {
    const {
      destinationAccount,
      sharedSecret
    } = this.streamServer.generateAddressAndSecret(
      b64urlEncode(Buffer.from(requestId))
    )
    const body: SPSPResponse = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      destination_account: destinationAccount,
      // eslint-disable-next-line @typescript-eslint/camelcase
      shared_secret: sharedSecret.toString('base64')
    }
    this.streamServer.generateAddressAndSecret(requestId)
    return body
  }
}
