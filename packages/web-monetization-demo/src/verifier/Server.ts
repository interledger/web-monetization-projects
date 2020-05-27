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

import { dbg } from '../utils/logging'

import { ReceiptVerifier } from './ReceiptVerifier'

@controller('/')
export class Server extends BaseHttpController {
  receiverEndpoint: string

  constructor(private receiptVerifier: ReceiptVerifier) {
    super()
    this.receiverEndpoint =
      process.env.RECEIVER_ENDPOINT || 'http://localhost:4000/spsp'
  }

  /*
   * Acts as a proxy to an SPSP receiver
   */
  @httpGet('spsp/:pointer')
  async spsp(
    @requestParam('pointer') pointer: string,
    @response() resp: express.Response
  ) {
    const {
      receiptNonce,
      receiptSecret
    } = this.receiptVerifier.generateReceiptDetails()
    const spspResp = await fetch(`${this.receiverEndpoint}/${pointer}`, {
      headers: {
        'content-type': 'application/spsp4+json',
        'Receipt-Nonce': receiptNonce.toString('base64'),
        'Receipt-Secret': receiptSecret.toString('base64')
      }
    })
    const body = await spspResp.json()
    resp.set('content-type', 'application/spsp4+json')
    resp.status(200)
    dbg({ body })
    resp.send(JSON.stringify(body))
  }

  @httpPost('balances/:requestId::creditReceipt')
  async postReceipt(
    @requestParam('requestId') requestId: string,
    @requestBody() receipt: string
  ) {
    const balance = this.receiptVerifier.creditReceipt(requestId, receipt)
    return this.json(balance.balance)
  }
}
