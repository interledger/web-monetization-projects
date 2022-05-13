import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody
} from 'inversify-express-utils'
import { inject } from 'inversify'
import * as bodyParser from 'body-parser'

import { TLogger } from '../../di/tokens'
import { Logger } from '../../utils/logger'

@controller('/issuer')
export class AnonTokenIssuerController extends BaseHttpController {
  constructor(
    @inject(TLogger)
    private log: Logger
  ) {
    super()
  }

  @httpPost('/' /*bodyParser.json()*/)
  issue(@requestBody() body: { bl_sig_request: string }) {
    this.log('/', body)
    return body
  }
}
