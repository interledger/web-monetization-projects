import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils'

import { BalancesService } from '../../balances/BalancesService'

@controller('/balances')
export class BalancesController extends BaseHttpController {
  constructor(private balancesService: BalancesService) {
    super()
  }

  @httpGet('/')
  balances() {
    return JSON.stringify(this.balancesService.getBalances())
  }
}
