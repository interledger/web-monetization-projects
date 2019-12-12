import { randomBytes } from 'crypto'

import { longHash } from './lib/hash'
import { hexString, blindMessageHash, unblindBlindSignature } from './lib/blind'

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

export interface PublicFields {
  e: number
  n: string
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

    return paramsRes.json() as Promise<PublicFields>
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
    const nBits = (key.n.length / 2) * 8

    // TODO: handle errors in here
    // TODO: should we batch in any way?
    for (let i = 0; i < tokenCount; ++i) {
      const token = this._getRandomToken()
      const hashedToken = longHash(nBits, token).toString('hex')
      const {
        blindedMessageHash: blindedTokenHash,
        blindingFactor
      } = blindMessageHash({
        n: key.n,
        e: key.e,
        messageHash: hashedToken
      })

      const { month, signature } = await this._signToken(
        blindedTokenHash,
        coilAuthToken
      )

      // TODO: should we test the signature?
      const unblindedSignature = unblindBlindSignature({
        n: key.n,
        blindingFactor,
        blindSignature: signature
      })

      await this.store.setItem(
        TOKEN_PREFIX + token,
        JSON.stringify({ month, signature: unblindedSignature })
      )
    }
  }
}
