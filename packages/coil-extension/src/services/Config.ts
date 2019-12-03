import { inject, injectable } from 'inversify'

import * as tokens from '../types/tokens'

@injectable()
export class Config {
  get coilDomain() {
    return this.coilDomainDefault
  }

  constructor(
    @inject(tokens.CoilDomain)
    protected coilDomainDefault: string
  ) {}
}
