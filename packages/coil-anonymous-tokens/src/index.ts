import { randomBytes } from 'crypto'

import { BigInteger } from 'jsbn'
import {
  hexString,
  hashAndBlindMessage,
  unblindSignature,
  verifySignature,
  PublicRSAKey
} from 'blind-signature'

import {
  GenerateNewTokens,
  BuildIssueRequest,
  BlindToken,
  parseIssueResp,
  getCurvePoints,
  verifyProof,
  getTokenEncoding
} from './lib/privacypass'

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

export interface RawIssueResponse {
  sigs: string[]
  proof: string
  version: string
}

export interface IssueResponse {
  signatures: string[]
  proof: string
  version: string
  prng: string
}

export interface Token {
  token: string
  blindedTokenHash: string
  blindingFactor: string
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
    coilAuthToken: string,
    request: string
  ): Promise<IssueResponse> {
    const signRes = await fetch(this.signerUrl + '/issue', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${coilAuthToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        // TODO: this might need to be base64'd
        bl_sig_req: request
      })
    })

    if (!signRes.ok) {
      this.debug('token /issue failed status=%d', signRes.status)
      throw new Error(`failed to get token signature. code=${signRes.status}`)
    }

    const body = (await signRes.json()) as RawIssueResponse
    return parseIssueResp(body) as IssueResponse
  }

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
    // TODO: how do we manage commitments?
    // const key = await this._getKeyParams()

    // Generate all tokens first so the timing in between tokens can't be used
    // to learn anything about the token or blinding factor.
    const tokens = GenerateNewTokens(this.batchSize)
    const request = BuildIssueRequest(tokens)

    const signPromise = this._signToken(coilAuthToken, request).then(
      async (issueResp: IssueResponse) => {
        const curvePoints = getCurvePoints(issueResp.signatures)

        await this._verifyProof(
          issueResp.proof,
          issueResp.prng,
          curvePoints,
          tokens
        )
        this._storeNewTokens(tokens, curvePoints.points)
      }
    )

    await signPromise
  }

  // TODO: no any
  private _storeNewTokens(tokens: BlindToken[], signedPoints: any) {
    for (let i = 0; i < tokens.length; ++i) {
      // TODO: is t.data even a string?
      const encoded = getTokenEncoding(tokens[i], signedPoints[i])
      this.store.setItem(TOKEN_PREFIX + tokens[i].data, JSON.stringify(encoded))
    }
  }

  private async _getCommitments() {
    return { G: 'todo', H: 'todo' }
  }

  // TODO: no any
  private async _verifyProof(
    proof: string,
    prng: string,
    curvePoints: any,
    tokens: BlindToken[]
  ) {
    const commitments = await this._getCommitments()
    if (!verifyProof(proof, tokens, curvePoints, commitments, prng)) {
      throw new Error('[privacy pass]: unable to verify dleq proof.')
    }
  }
}
