import {
  BaseHttpController,
  controller,
  httpGet,
  requestHeaders,
  requestParam,
  response
} from 'inversify-express-utils'
import * as express from 'express'

import { StreamServer } from './StreamServer'
import { dbg } from './logging'

@controller('/')
export class SPSP extends BaseHttpController {
  constructor(private streamServer: StreamServer) {
    super()
  }

  @httpGet('spsp/:pointer')
  async spsp(
    @requestHeaders('web-monetization-id') requestId: string,
    @requestParam('pointer') pointer: string,
    @response() resp: express.Response
  ) {
    const body = await this.streamServer.getSPSPResponse(requestId)
    resp.status(200)
    resp.set('Access-Control-Allow-Origin', '*')
    resp.set('content-type', 'application/spsp4+json')
    dbg({ body })
    resp.send(JSON.stringify(body))
  }

  @httpGet('balance/:requestId')
  async balance(
    @response() resp: express.Response,
    @requestParam('requestId') requestId: string
  ) {
    resp.set('Access-Control-Allow-Origin', '*')
    const balance = this.streamServer.balances[requestId]
    if (balance) {
      return this.json(balance)
    } else {
      return this.notFound()
    }
  }
}
