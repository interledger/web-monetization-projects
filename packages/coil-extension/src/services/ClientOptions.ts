import { inject, injectable } from 'inversify'
import { GraphQlClientOptions } from '@coil/client'

import * as tokens from '../types/tokens'
import { Logger, logger } from '../background/services/utils'

@injectable()
export class ClientOptions extends GraphQlClientOptions {
  constructor(
    @logger('CoilClient')
    public log: Logger,
    @inject(tokens.CoilDomain) public coilDomain: string
  ) {
    super()
  }
}
