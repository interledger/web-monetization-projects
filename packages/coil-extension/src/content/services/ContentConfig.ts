import { inject } from 'inversify'

import { Config } from '../../services/Config'
import * as tokens from '../../types/tokens'

export class ContentConfig extends Config {
  constructor(@inject(tokens.CoilDomain) coilDomain: string) {
    super(coilDomain)
  }

  public overRideCoilDomain: string | null = null

  get coilDomain() {
    return this.overRideCoilDomain ?? this.coilDomainDefault
  }
}
