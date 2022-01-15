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
import figlet from 'figlet'
import fetch from 'node-fetch'

@controller('/')
export class Server extends BaseHttpController {
  balances: Record<string, number> = {}
  verifierUrl: string

  constructor() {
    super()
    this.verifierUrl =
      process.env.VERIFIER_URL || 'http://localhost:4001/verify'
  }

  @httpGet('balances/:requestId')
  async getBalance(@requestParam('requestId') requestId: string) {
    const balance = this.balances[requestId] || 0
    return this.ok(figlet.textSync(balance.toString()))
  }

  @httpPost('balances/:requestId::creditReceipt')
  async postReceipt(
    @requestParam('requestId') requestId: string,
    @requestBody() receipt: string,
    @response() resp: express.Response
  ) {
    const verifyResp = await fetch(this.verifierUrl, {
      method: 'POST',
      body: receipt
    })
    const response = (await verifyResp.json()) as { amount: string }
    const amount = parseInt(response.amount)

    if (this.balances[requestId]) {
      this.balances[requestId] += amount
    } else {
      this.balances[requestId] = amount
    }
    resp.sendStatus(201)
  }
}
