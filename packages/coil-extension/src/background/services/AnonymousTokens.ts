import { Container, decorate, inject, injectable } from 'inversify'
import * as anonymousTokens from '@coil/anonymous-tokens'

import * as tokens from '../../types/tokens'

import { Logger, logger } from './utils'

decorate(injectable(), anonymousTokens.AnonymousTokens)

const ANON_TOKEN_BATCH_SIZE = 10

@injectable()
export class AnonymousTokens extends anonymousTokens.AnonymousTokens {
  constructor(
    @inject(tokens.CoilRedeemerUrl) redeemerUrl: string,
    @inject(tokens.CoilSignerUrl) signerUrl: string,
    @inject(Storage) storage: Storage,
    @logger('AnonymousTokens') debug: Logger
  ) {
    super({
      redeemerUrl,
      signerUrl,
      store: new TokenStore(storage),
      debug,
      batchSize: ANON_TOKEN_BATCH_SIZE
    })
  }
}

class TokenStore {
  private storage: Storage
  constructor(localStorage: Storage) {
    this.storage = localStorage
  }

  setItem(key: string, value: string): Promise<string> {
    this.storage.setItem(key, value)
    return Promise.resolve(value)
  }

  removeItem(key: string): Promise<void> {
    this.storage.removeItem(key)
    return Promise.resolve()
  }

  iterate(
    fn: (
      value: string,
      key: string,
      iterationNumber: number
    ) => anonymousTokens.StorableBlindToken | undefined
  ): Promise<anonymousTokens.StorableBlindToken | undefined> {
    let i = 0
    let key
    while ((key = this.storage.key(i)) !== null) {
      const value = this.storage.getItem(key)
      if (value === null) continue
      const result = fn(value, key, i)
      if (result) return Promise.resolve(result)
      i++
    }
    return Promise.resolve(undefined)
  }
}
