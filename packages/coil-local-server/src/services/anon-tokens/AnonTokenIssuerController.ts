import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody
} from 'inversify-express-utils'
import { inject } from 'inversify'

import { TLogger } from '../../di/tokens'
import type { Logger } from '../../utils/logger'

@controller('/issuer')
export class AnonTokenIssuerController extends BaseHttpController {
  constructor(
    @inject(TLogger)
    private log: Logger
  ) {
    super()
  }

  @httpPost('/issue')
  async issue(@requestBody() body: IssueRequest): Promise<IssueResponse> {
    const inner: InnerIssueRequest = JSON.parse(
      Buffer.from(body.bl_sig_req, 'base64').toString()
    )
    return {
      // Just echo them back
      sigs: inner.contents,
      // Proof verification is disabled in local server mode
      proof: '',
      version: '1.0'
    }
  }
}

export interface IssueRequest {
  // base64 encoded InnerIssueRequest
  bl_sig_req: string
}

export interface InnerIssueRequest {
  type: 'Issue'
  // base64 encoded compressed points on p256 curve
  contents: string[]
}

export interface IssueResponse {
  // base64 encoded points on p256 curve
  // Coil server sends them uncompressed though it should be fine
  sigs: string[]
  // base64 encoded hmac of math on points and ... ?? TODO
  proof: string
  version: '1.0'
}
