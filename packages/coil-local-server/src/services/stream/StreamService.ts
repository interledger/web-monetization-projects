import { inject, injectable } from 'inversify'
import {
  Connection,
  DataAndMoneyStream,
  Server as StreamServer
} from 'ilp-protocol-stream'

import { TLogger, TStreamServer } from '../../di/tokens'
import { Logger } from '../../utils/logger'

@injectable()
export class StreamService {
  constructor(
    @inject(TStreamServer)
    private streamServer: StreamServer,
    @inject(TLogger)
    private dbg: Logger
  ) {
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
}
