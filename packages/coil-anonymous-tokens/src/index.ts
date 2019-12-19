import { randomBytes } from 'crypto'

import { BigInteger } from 'jsbn'
import {
  longHash,
  hexString,
  hashAndBlindMessage,
  unblindSignature,
  verifySignature,
  PublicRSAKey
} from 'blind-signature'

export function base64url(buf: Buffer) {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const TOKEN_PREFIX = 'anonymous_token:'
export interface SignedToken {
  value: string
  month: string
  signature: hexString
}

export interface TimestampedSignature {
  signature: string
  month: string
}

export interface PublicFields extends PublicRSAKey {
  month: string
}

// TODO: should these be allowed to be async?
// TODO: went for localforage-like, could chang
export interface TokenStore {
  getItem: (key: string) => Promise<string>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  iterate: (
    fn: (
      value: string,
      key: string,
      iterationNumber: number
    ) => SignedToken | undefined
  ) => Promise<SignedToken | undefined>
}

export class AnonymousTokens {
  private store: TokenStore

  constructor(store: TokenStore) {
    this.store = store
  }

  async getToken(): Promise<SignedToken | undefined> {
    return this.store.iterate((blob: string, name: string) => {
      if (name.startsWith(TOKEN_PREFIX)) {
        const value = name.substring(TOKEN_PREFIX.length)
        const { signature, month } = JSON.parse(blob)

        return {
          value,
          signature,
          month
        }
      }
    })
  }

  async removeToken(token: SignedToken) {
    await this.store.removeItem(TOKEN_PREFIX + token.value)
  }

  async _getKeyParams(): Promise<PublicFields> {
    // TODO: get the actual domain/path of redeemer service
    const paramsRes = await fetch('redeemer.coil.com/parameters')
    if (!paramsRes.ok) {
      throw new Error('could not fetch key params from coil')
    }

    const result = await paramsRes.json()
    return {
      n: new BigInteger(result.n, 16),
      e: result.e,
      month: result.month
    }
  }

  async _signToken(
    blindedTokenHash: hexString,
    coilAuthToken: string
  ): Promise<TimestampedSignature> {
    // TODO: pass the month in here so we don't get errors on month boundary
    const signRes = await fetch('redeemer.coil.com/sign', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${coilAuthToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        blinded_message_hash: blindedTokenHash
      })
    })

    if (!signRes.ok) {
      throw new Error(`failed to get token signature. code=${signRes.status}`)
    }

    return signRes.json() as Promise<TimestampedSignature>
  }

  _getRandomToken() {
    return base64url(randomBytes(16))
  }

  // TODO: what's the way to get coil auth token in here?
  async populateTokens(coilAuthToken: string, tokenCount: number) {
    const key = await this._getKeyParams()

    // TODO: handle errors in here
    // TODO: we should generate all tokens first so you can't use the timing in
    // between tokens to learn anything about token or blinding factor
    for (let i = 0; i < tokenCount; ++i) {
      const token = this._getRandomToken()
      const {
        blindedMessageHash: blindedTokenHash,
        blindingFactor
      } = hashAndBlindMessage(key, token)

      const { month, signature: blindSignature } = await this._signToken(
        blindedTokenHash,
        coilAuthToken
      )

      const signature = unblindSignature(key, blindSignature, blindingFactor)
      if (!verifySignature(key, token, signature)) {
        // TODO: how do we handle this properly? invalid signature means the server might be trying to trick us by signing our message with a different key than advertised to try to deanonymize us
        throw new Error('produced invalid signature!')
      }

      await this.store.setItem(
        TOKEN_PREFIX + token,
        JSON.stringify({ month, signature })
      )
    }
  }
}
