import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestHeaders,
  requestBody,
  requestParam,
  response
} from 'inversify-express-utils'
import * as express from 'express'

import { ReceiptVerifier } from './ReceiptVerifier'
import { StreamServer } from './StreamServer'
import { dbg } from './logging'

@controller('/')
export class SPSP extends BaseHttpController {
  constructor(
    private streamServer: StreamServer,
    private receiptVerifier: ReceiptVerifier
  ) {
    super()
  }

  @httpGet('spsp/:pointer')
  async spsp(
    @requestHeaders('receipt-nonce') receiptNonce: string,
    @requestHeaders('receipt-secret') receiptSecret: string,
    @requestParam('pointer') pointer: string,
    @response() resp: express.Response
  ) {
    const body = await this.streamServer.getSPSPResponse(
      this.receiptVerifier.generateReceiptDetails()
    )
    resp.status(200)
    resp.set('Access-Control-Allow-Origin', '*')
    resp.set('content-type', 'application/spsp4+json')
    dbg({ body })
    resp.send(JSON.stringify(body))
  }

  @httpPost('balance/:requestId::creditReceipt')
  async postReceipt(
    @response() resp: express.Response,
    @requestParam('requestId') requestId: string,
    @requestBody() receipt: string
  ) {
    resp.set('Access-Control-Allow-Origin', '*')
    const balance = this.receiptVerifier.creditReceipt(requestId, receipt)
    return this.json(balance)
  }

  @httpGet('balance/:requestId')
  async balance(
    @response() resp: express.Response,
    @requestParam('requestId') requestId: string
  ) {
    resp.set('Access-Control-Allow-Origin', '*')
    const balance = this.receiptVerifier.balances[requestId]
    if (balance) {
      return this.json(balance)
    } else {
      return this.notFound()
    }
  }
}
