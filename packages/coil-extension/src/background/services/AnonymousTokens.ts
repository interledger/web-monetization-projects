import { decorate, inject, injectable } from 'inversify'
import * as idbKv from 'idb-keyval'
import * as anonymousTokens from '@coil/anonymous-tokens'
import { BlindToken, CurvePoints } from '@coil/privacypass-sjcl'
import { StorableBlindToken } from '@coil/anonymous-tokens'

import * as tokens from '../../types/tokens'
import type { BuildConfig } from '../../types/BuildConfig'

import { logger } from './utils'
import type { Logger } from './utils'

decorate(injectable(), anonymousTokens.AnonymousTokens)

const ANON_TOKEN_BATCH_SIZE = 10

@injectable()
export class IDBTokenStore implements anonymousTokens.TokenStore {
  private store = idbKv.createStore('anonTokens', 'anonTokens')

  async clear() {
    return idbKv.clear(this.store)
  }

  async iterate(
    fn: (key: string, value: string) => StorableBlindToken | undefined
  ): Promise<StorableBlindToken | undefined> {
    const entries = await idbKv.entries<string, string>(this.store)
    for (const [key, val] of entries) {
      const token = fn(key, val)
      if (token) {
        return token
      }
    }
  }

  async removeItem(key: string): Promise<void> {
    return idbKv.del(key, this.store)
  }

  async setItem(key: string, value: string): Promise<string> {
    await idbKv.set(key, value, this.store)
    return value
  }
}

@injectable()
export class AnonymousTokens extends anonymousTokens.AnonymousTokens {
  constructor(
    @inject(tokens.BuildConfig) private buildConfig: BuildConfig,
    @inject(tokens.CoilDomain) coilHost: string,
    @inject(tokens.TokenStore) store: anonymousTokens.TokenStore,
    @logger('AnonymousTokens') debug: Logger
  ) {
    super({
      redeemerUrl: coilHost + '/redeemer',
      signerUrl: coilHost + '/issuer',
      store,
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
