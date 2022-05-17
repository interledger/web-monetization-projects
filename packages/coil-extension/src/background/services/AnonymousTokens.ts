import { decorate, inject, injectable } from 'inversify'
import * as anonymousTokens from '@coil/anonymous-tokens'
import { BlindToken, CurvePoints } from '@coil/privacypass-sjcl'

import * as tokens from '../../types/tokens'
import { BuildConfig } from '../../types/BuildConfig'

import { Logger, logger } from './utils'

decorate(injectable(), anonymousTokens.AnonymousTokens)

const ANON_TOKEN_BATCH_SIZE = 10

class TokenStore {
  private storage: Storage
  constructor(localStorage: Storage) {
    this.storage = localStorage
  }

  async setItem(key: string, value: string): Promise<string> {
    this.storage.setItem(key, value)
    return Promise.resolve(value)
  }

  async removeItem(key: string): Promise<void> {
    this.storage.removeItem(key)
    return Promise.resolve()
  }

  async iterate(
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

@injectable()
export class AnonymousTokens extends anonymousTokens.AnonymousTokens {
  constructor(
    @inject(tokens.BuildConfig) private buildConfig: BuildConfig,
    @inject(tokens.CoilDomain) coilHost: string,
    @inject(Storage) storage: Storage,
    @logger('AnonymousTokens') debug: Logger
  ) {
    super({
      redeemerUrl: coilHost + '/redeemer',
      signerUrl: coilHost + '/issuer',
      store: new TokenStore(storage),
      debug,
      batchSize: ANON_TOKEN_BATCH_SIZE
    })
  }

  protected async _verifyProof(
    proof: string,
    prng: string,
    curvePoints: CurvePoints,
    tokens: BlindToken[]
  ): Promise<void> {
    if (this.buildConfig.useLocalMockServer) {
      // Don't check proof as the local mock server doesn't actually create any
      // yet. We could use an elliptic impl that is 99% ready, but it's really
      // slow.
    } else {
      return super._verifyProof(proof, prng, curvePoints, tokens)
    }
  }
}
