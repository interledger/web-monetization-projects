import { randomBytes } from 'crypto'

import { BigInteger } from 'jsbn'
import {
  hexString,
  hashAndBlindMessage,
  unblindSignature,
  verifySignature,
  PublicRSAKey
} from 'blind-signature'

export function base64url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function _getRandomToken(): string {
  return base64url(randomBytes(16))
}

export const TOKEN_PREFIX = 'anonymous_token:'
export interface SignedToken {
  message: string
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
  //getItem: (key: string) => Promise<string>
  setItem: (key: string, value: string) => Promise<string>
  removeItem: (key: string) => Promise<void>
  iterate: (
    fn: (
      value: string,
      key: string,
      iterationNumber: number
    ) => SignedToken | undefined
  ) => Promise<SignedToken | undefined>
}

export interface AnonymousTokensOptions {
  // The `protocol://host` of the coil services.
  redeemerUrl: string
  signerUrl: string
  store: TokenStore
  debug?: typeof console.log
  batchSize: number
}

export class AnonymousTokens {
  private redeemerUrl: string
  private signerUrl: string
  private store: TokenStore
  // Maps btpToken => SignedToken.message
  private tokenMap: Map<string, string> = new Map()
  private debug: typeof console.log
  private batchSize: number

  private storedTokenCount: number
  private _populateTokensPromise: Promise<void> | null = null

  constructor({
    redeemerUrl,
    signerUrl,
    store,
    debug,
    batchSize
  }: AnonymousTokensOptions) {
    this.redeemerUrl = redeemerUrl
    this.signerUrl = signerUrl
    this.store = store
    this.debug = debug || function() {}
    this.batchSize = batchSize

    let count = 0
    this.store.iterate((_blob: string, name: string) => {
      if (name.startsWith(TOKEN_PREFIX)) count++
      return undefined
    })
    this.storedTokenCount = count
  }

  async getToken(coilAuthToken: string): Promise<string> {
    // When there is only 1 token left, fetch some more in the background.
    if (this.storedTokenCount === 1) {
      this.populateTokens(coilAuthToken)
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const signedToken = await this._getSignedToken()
      if (!signedToken) {
        await this.populateTokens(coilAuthToken)
        continue
      }
      const btpToken = await this._redeemToken(signedToken)
      if (btpToken) return btpToken
      // Otherwise, try again, since the retrieved token was likely expired.
    }
  }

  private async _redeemToken(
    signedToken: SignedToken
  ): Promise<string | undefined> {
    const response = await fetch(this.redeemerUrl + '/redeem', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(signedToken)
    })
    if (response.status === 400) {
      // The stored token was invalid or expired (the server wouldn't verify it).
      await this._removeSignedToken(signedToken.message)
      return
    }
    if (!response.ok) {
      throw new Error(`failed to redeem token. code=${response.status}`)
    }
    const body = await response.json()
    const btpToken = body.token
    if (!btpToken) {
      throw new Error(
        `invalid redeemed token. response=${JSON.stringify(body)}`
      )
    }
    this.tokenMap.set(btpToken, signedToken.message)
    return btpToken
  }

  private _getSignedToken(): Promise<SignedToken | undefined> {
    return this.store.iterate((blob: string, name: string) => {
      if (name.startsWith(TOKEN_PREFIX)) {
        const message = name.substring(TOKEN_PREFIX.length)
        const { signature, month } = JSON.parse(blob)
        return {
          message,
          signature,
          month
        }
      }
    })
  }

  removeToken(btpToken: string): Promise<void> {
    const anonUserId = this.tokenMap.get(btpToken)
    this.tokenMap.delete(btpToken)
    if (anonUserId) return this._removeSignedToken(anonUserId)
    else return Promise.resolve()
  }

  private _removeSignedToken(anonUserId: string): Promise<void> {
    this.storedTokenCount--
    this.debug('removing token anonUserId=%s', anonUserId)
    return this.store.removeItem(TOKEN_PREFIX + anonUserId)
  }

  private async _getKeyParams(): Promise<PublicFields> {
    const paramsRes = await fetch(this.signerUrl + '/parameters')
    if (!paramsRes.ok) {
      this.debug('error fetching parameters status=%d', paramsRes.status)
      throw new Error('could not fetch key params from coil')
    }

    const result = await paramsRes.json()
    return {
      n: new BigInteger(result.n, 16),
      e: result.e,
      month: result.month
    }
  }

  private async _signToken(
    blindedTokenHash: hexString,
    coilAuthToken: string,
    month: string
  ): Promise<TimestampedSignature> {
    const signRes = await fetch(this.signerUrl + '/sign', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${coilAuthToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        blinded_message_hash: blindedTokenHash,
        month
      })
    })

    if (!signRes.ok) {
      this.debug('token /sign failed status=%d', signRes.status)
      throw new Error(`failed to get token signature. code=${signRes.status}`)
    }
    const body = await signRes.json()
    if (!body.success) {
      this.debug('token /sign failed message=%s', body.mesage)
      throw new Error(`failed to get token signature. message=${body.message}`)
    }

    return body as TimestampedSignature
  }

  // TODO private?
  private async populateTokens(coilAuthToken: string): Promise<void> {
    // Ensure that at most one `_populateTokens` call runs simultaneously.
    if (this._populateTokensPromise) return this._populateTokensPromise
    this._populateTokensPromise = this._populateTokensNow(coilAuthToken)
    try {
      await this._populateTokensPromise
    } finally {
      this._populateTokensPromise = null
    }
  }

  private async _populateTokensNow(coilAuthToken: string): Promise<void> {
    const key = await this._getKeyParams()
    const tokens = []
    // Generate all tokens first so the timing in between tokens can't be used
    // to learn anything about the token or blinding factor.
    for (let i = 0; i < this.batchSize; i++) {
      const token = _getRandomToken()
      const {
        blindedMessageHash: blindedTokenHash,
        blindingFactor
      } = hashAndBlindMessage(key, token)
      tokens.push({ token, blindedTokenHash, blindingFactor })
    }

    let gotTokens = 0
    for (const tokenData of tokens) {
      const signPromise = this._signToken(
        tokenData.blindedTokenHash,
        coilAuthToken,
        key.month
      ).then(({ month, signature: blindSignature }) => {
        const signature = unblindSignature(
          key,
          blindSignature,
          tokenData.blindingFactor
        )
        if (!verifySignature(key, tokenData.token, signature)) {
          // TODO: how do we handle this properly? invalid signature means the server might be trying to trick us by signing our message with a different key than advertised to try to deanonymize us
          throw new Error('produced invalid signature!')
        }

        return this.store.setItem(
          TOKEN_PREFIX + tokenData.token,
          JSON.stringify({ month, signature })
        )
      })
      await signPromise
        .then(() => gotTokens++)
        .catch(err => {
          this.debug('failed to generate token err=%s', err.message)
        })
    }
    this.debug(
      'populateTokens got=%d want=%d tokens',
      gotTokens,
      this.batchSize
    )
    this.storedTokenCount += gotTokens

    if (gotTokens === 0) {
      throw new Error('no anonymous tokens could be prepared')
    }
  }
}
