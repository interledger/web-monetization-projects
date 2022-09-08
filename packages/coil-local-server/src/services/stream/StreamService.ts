import { inject, injectable } from 'inversify'
import {
  Connection,
  DataAndMoneyStream,
  Server as StreamServer
} from 'ilp-protocol-stream'

import { TLogger, TStreamServer } from '../../di/tokens'
import { Logger } from '../../utils/logger'
import { BalancesService } from '../balances/BalancesService'

@injectable()
export class StreamService {
  constructor(
    @inject(TStreamServer)
    private streamServer: StreamServer,
    @inject(TLogger)
    private dbg: Logger,
    private balances: BalancesService
  ) {
    this.streamServer.on('connection', (connection: Connection) => {
      this.dbg('connection tag', connection.connectionTag)
      connection.on('stream', async (stream: DataAndMoneyStream) => {
        stream.on('money', amount => {
          dbg('incoming_money', amount)
          if (connection.connectionTag) {
            this.balances.addPacket(connection.connectionTag, amount)
          }
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
    // TODO: seems stream isOpen when connection is closed ...
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
