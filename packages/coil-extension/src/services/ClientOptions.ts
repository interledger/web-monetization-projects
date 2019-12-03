import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'

import * as tokens from '../types/tokens'

@injectable()
export class ClientOptions extends GraphQlClient.Options {
  logger = console.log
  constructor(@inject(tokens.CoilDomain) public coilDomain: string) {
    super()
  }
}
