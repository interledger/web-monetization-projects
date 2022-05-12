import { injectable } from 'inversify'
import { SPSPResponse } from '@webmonetization/types'

import { StreamService } from '../stream/StreamService'

@injectable()
export class SPSPService {
  constructor(private streamService: StreamService) {}

  getResponse(opts: {
    connectionTag?: string
    receiptNonce?: string
    receiptSecret?: string
  }): SPSPResponse {
    const { destinationAccount, sharedSecret, receiptsEnabled } =
      this.streamService['streamServer'].generateAddressAndSecret({
        connectionTag: opts.connectionTag,
        receiptNonce: opts.receiptNonce
          ? Buffer.from(opts.receiptNonce, 'base64')
          : undefined,
        receiptSecret: opts.receiptSecret
          ? Buffer.from(opts.receiptSecret, 'base64')
          : undefined
      })
    return {
      destination_account: destinationAccount,
      shared_secret: sharedSecret.toString('base64'),
      receipts_enabled: receiptsEnabled
    }
  }
}
