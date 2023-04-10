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

import { dbg } from '../utils/logging'
import { resolvePointer } from '../utils/payment-pointer'

import { ReceiptVerifier } from './ReceiptVerifier'

@controller('/')
export class Server extends BaseHttpController {
  constructor(private receiptVerifier: ReceiptVerifier) {
    super()
  }

  /*
   * Acts as a proxy to an SPSP receiver
   */
  @httpGet(':pointer')
  async spsp(
    @requestParam('pointer') pointer: string,
    @response() resp: express.Response
  ) {
    const { receiptNonce, receiptSecret } =
      this.receiptVerifier.generateReceiptDetails()
    console.log(resolvePointer(decodeURIComponent(pointer)))
    const spspResp = await fetch(resolvePointer(decodeURIComponent(pointer)), {
      headers: {
        Accept: 'application/spsp4+json',
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

  @httpPost('verify')
  async postReceipt(@requestBody() receipt: string) {
    const amount = this.receiptVerifier.verify(receipt)
    return this.json({ amount })
  }
}
