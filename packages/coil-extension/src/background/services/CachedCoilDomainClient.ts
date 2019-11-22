import { Container, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'

import * as tokens from '../../types/tokens'

import { Config } from './Config'

@injectable()
export class CachedCoilDomainClient {
  private clients = new Map<string, GraphQlClient>()

  constructor(private container: Container, private config: Config) {}

  get(): GraphQlClient {
    const key = this.config.coilDomain
    const existing = this.clients.get(key)
    if (existing) {
      return existing
    } else {
      const child = this.container.createChild()
      child.bind(tokens.CoilDomain).toConstantValue(key)
      const client = child.get(GraphQlClient)
      this.clients.set(key, client)
      return client
    }
  }
}
