import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost
} from 'inversify-express-utils'

import { AuthService } from '../auth/AuthService'

@controller('/redeemer')
export class AnonTokenRedeemerController extends BaseHttpController {
  constructor(private auth: AuthService) {
    super()
  }

  @httpGet('/commitments')
  commitments() {
    return []
  }

  @httpPost('/redeem')
  redeem() {
    return { token: this.auth.signJwt({ btp: true }) }
  }
}
