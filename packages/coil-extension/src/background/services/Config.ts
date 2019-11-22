import { injectable, inject } from 'inversify'

import { LocalStorageProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'

@injectable()
export class Config {
  get coilDomain() {
    return this.store.coilDomain || this.coilDomainDefault
  }

  constructor(
    @inject(tokens.CoilDomain)
    private coilDomainDefault: string,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy
  ) {}
}
