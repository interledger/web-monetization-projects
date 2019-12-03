import { injectable, inject } from 'inversify'

import { LocalStorageProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'
import { Config } from '../../services/Config'

@injectable()
export class BackgroundConfig extends Config {
  get coilDomain() {
    return this.store.coilDomain || this.coilDomainDefault
  }

  constructor(
    @inject(tokens.CoilDomain)
    coilDomainDefault: string,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy
  ) {
    super(coilDomainDefault)
  }
}
