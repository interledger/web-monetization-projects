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
          await this.acceptMoneySlowly(stream)
        }
      })
    })
    this.streamServer.on('error', () => {
      dbg('streamServer error')
    })
  }

  /**
   * We want to slow the STREAM down a bit, so we can see the packets
   */
  private async acceptMoneySlowly(stream: DataAndMoneyStream) {
    let max = 20e3
    while (stream.isOpen()) {
      stream.setReceiveMax(max)
      const rand = (n: number) => Math.floor(Math.random() * n)
      const timeout = 250 + rand(250)
      await new Promise(resolve => setTimeout(resolve, timeout))
      const extra = 10e3 + rand(20e3)
      max += extra
      this.dbg({ total: max })
    }
  }
}
