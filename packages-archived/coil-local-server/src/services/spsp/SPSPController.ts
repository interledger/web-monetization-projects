import {
  BaseHttpController,
  controller,
  httpGet,
  requestHeaders,
  requestParam,
  response
} from 'inversify-express-utils'
import * as express from 'express'
import { inject } from 'inversify'

import { Logger } from '../../utils/logger'
import { TLogger } from '../../di/tokens'

import { SPSPService } from './SPSPService'

@controller('/')
export class SPSPController extends BaseHttpController {
  constructor(
    @inject(TLogger)
    private log: Logger,
    private spsp: SPSPService
  ) {
    super()
  }

  @httpGet('spsp/:pointer')
  async spspGET(
    @requestParam('pointer') pointer: string,
    @requestHeaders('receipt-nonce') receiptNonce: string,
    @requestHeaders('receipt-secret') receiptSecret: string,
    @response() resp: express.Response
  ) {
    const body = this.spsp.getResponse({
      connectionTag: pointer,
      receiptNonce,
      receiptSecret
    })
    resp.status(200)
    resp.set('content-type', 'application/spsp4+json')
    this.log({ body })
    resp.send(JSON.stringify(body))
  }
}
