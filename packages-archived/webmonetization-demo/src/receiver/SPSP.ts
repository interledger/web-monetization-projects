import {
  BaseHttpController,
  controller,
  httpGet,
  requestHeaders,
  response
} from 'inversify-express-utils'
import * as express from 'express'

import { dbg } from '../utils/logging'

import { StreamServer } from './StreamServer'

@controller('/')
export class SPSP extends BaseHttpController {
  constructor(private streamServer: StreamServer) {
    super()
  }

  @httpGet('spsp/:pointer')
  async spsp(
    @requestHeaders('receipt-nonce') receiptNonce: string,
    @requestHeaders('receipt-secret') receiptSecret: string,
    @response() resp: express.Response
  ) {
    const body = await this.streamServer.getSPSPResponse({
      receiptNonce,
      receiptSecret
    })
    resp.status(200)
    resp.set('content-type', 'application/spsp4+json')
    dbg({ body })
    resp.send(JSON.stringify(body))
  }
}
