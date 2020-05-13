import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
  response
} from 'inversify-express-utils'
import * as express from 'express'
import fetch from 'node-fetch'

import { ReceiptVerifier } from './ReceiptVerifier'
import { dbg } from './logging'

@controller('/')
export class SPSP extends BaseHttpController {
  spspEndpoint: string

  constructor(private receiptVerifier: ReceiptVerifier) {
    super()
    this.spspEndpoint =
      process.env.SPSP_ENDPOINT || 'http://localhost:4000/spsp/~niq'
  }

  @httpGet('spsp/:pointer')
  async spsp(@response() resp: express.Response) {
    const {
      receiptNonce,
      receiptSecret
    } = this.receiptVerifier.generateReceiptDetails()
    const spspResp = await fetch(this.spspEndpoint, {
      headers: {
        'content-type': 'application/spsp4+json',
        'Receipt-Nonce': receiptNonce.toString('base64'),
        'Receipt-Secret': receiptSecret.toString('base64')
      }
    })
    const body = await spspResp.json()
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
