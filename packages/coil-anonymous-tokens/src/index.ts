import {
  BlindToken,
  BuildIssueRequest,
  BuildRedeemHeader,
  Commitment,
  CurvePoints,
  deserializeToken,
  GenerateNewTokens,
  getCurvePoints,
  getTokenEncoding,
  h2cParams,
  initECSettings,
  IssueResponse,
  parseIssueResp,
  StorableBlindToken,
  verifyProof
} from '@coil/privacypass-sjcl'
import type { SjclEllipticalPoint } from 'sjcl'

import { portableFetch } from './portableFetch'

export function base64url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function tokenName(token: BlindToken): string {
  return Buffer.from(token.data).toString('base64')
}

function storableTokenName(token: StorableBlindToken): string {
  return token.data
}

export const TOKEN_PREFIX = 'anonymous_token:'

export interface TimestampedSignature {
  signature: string
  month: string
}

export interface Token {
  token: string
  blindedTokenHash: string
  blindingFactor: string
}

export interface TokenStore {
  clear(): Promise<void>
  setItem: (key: string, value: string) => Promise<string>
  removeItem: (key: string) => Promise<void>
  iterate: (
    fn: (key: string, value: string) => StorableBlindToken | undefined
  ) => Promise<StorableBlindToken | undefined>
}

export type { StorableBlindToken }

export interface AnonymousTokensOptions {
  // The `protocol://host` of the coil services.
  redeemerUrl: string
  signerUrl: string
  store: TokenStore
  debug?: typeof console.log
  batchSize: number
}

export interface AnonymousTokensService {
  /**
   * Returns a BTP token
   * @param coilAuthToken
   */
  getToken(coilAuthToken?: string): Promise<string>

  /**
   * Called when the token has been exhausted
   */
  removeToken(btpToken: string): Promise<void>
}

export interface BTPTokenData {
  userId: string // "anon:v/9Yq3ptxNJrxkwup6FjP3AL6Do8xGXPTeHa6tzhWas=",
  throughput: number // 100000,
  agg: number // 6000000,
  currency: string // "USD",
  scale: number // 9,
  anon: boolean // true,
  iat: number // 1652150952,
  exp: number // 1652155152
}

export class AnonymousTokens implements AnonymousTokensService {
  private readonly redeemerUrl: string
  private readonly signerUrl: string
  private store: TokenStore
  // Maps btpToken => SignedToken.message
  private tokenMap: Map<string, string> = new Map()
  private readonly debug: typeof console.log
  private readonly batchSize: number

  private storedTokenCount = 0
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
    this.debug = debug || function () {}
    this.batchSize = batchSize
    void this.getStoredTokenCount()

    // TODO: better config management
    initECSettings(h2cParams())
  }

  private async getStoredTokenCount() {
    let count = 0
    await this.store.iterate((name: string) => {
      if (name.startsWith(TOKEN_PREFIX)) count++
      return undefined
    })
    this.storedTokenCount = count
  }

  async getToken(coilAuthToken?: string): Promise<string> {
    // When there is only 1 token left, fetch some more in the background.
    if (this.storedTokenCount === 1) {
      // noinspection ES6MissingAwait
      void this.populateTokens(coilAuthToken)
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const token = await this._getSignedToken()
      if (!token) {
        await this.populateTokens(coilAuthToken)
        continue
      }
      const btpToken = await this._redeemToken(token)
      if (btpToken) return btpToken
      // Otherwise, try again, since the retrieved token was likely expired.
    }
  }

  private async _redeemToken(
    token: StorableBlindToken
  ): Promise<string | undefined> {
    const usableToken = deserializeToken(token)
    const redeemRequest = BuildRedeemHeader(usableToken, '', '')
    const response = await portableFetch(this.redeemerUrl + '/redeem', {
      method: 'POST',
      credentials: 'omit',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        bl_sig_req: redeemRequest
      })
    })

    if (response.status === 400) {
      // The stored token was invalid or expired (the server wouldn't verify it).
      await this._removeSignedToken(storableTokenName(token))
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

    // TODO: make sure the token data is a string and is a good identifier for the token
    this.tokenMap.set(btpToken, storableTokenName(token))
    return btpToken
  }

  private async _getSignedToken(): Promise<StorableBlindToken | undefined> {
    return this.store.iterate((name: string, blob: string) => {
      if (name.startsWith(TOKEN_PREFIX)) {
        return JSON.parse(blob) as StorableBlindToken
      }
    })
  }

  async removeToken(btpToken: string): Promise<void> {
    const anonUserId = this.tokenMap.get(btpToken)
    this.tokenMap.delete(btpToken)
    if (anonUserId) {
      return this._removeSignedToken(anonUserId)
    }
  }

  private async _removeSignedToken(anonUserId: string): Promise<void> {
    this.storedTokenCount--
    this.debug('removing token anonUserId=%s', anonUserId)
    return this.store.removeItem(TOKEN_PREFIX + anonUserId)
  }

  private async _signToken(
    request: string,
    coilAuthToken?: string
  ): Promise<IssueResponse> {
    const headers: Record<string, string> = {
      'content-type': 'application/json'
    }
    if (coilAuthToken) {
      headers.authorization = `Bearer ${coilAuthToken}`
    }
    const signRes = await portableFetch(this.signerUrl + '/issue', {
      method: 'POST',
      // We need this for SuperTokens and staging Cloudflare auth
      credentials: 'include',
      headers,
      body: JSON.stringify({
        bl_sig_req: request
      })
    })

    if (!signRes.ok) {
      this.debug('token /issue failed status=%d', signRes.status)
      throw new Error(`failed to get token signature. code=${signRes.status}`)
    }

    const body = await signRes.json()
    return parseIssueResp(body) as IssueResponse
  }

  private async populateTokens(coilAuthToken?: string): Promise<void> {
    // Ensure that at most one `_populateTokens` call runs simultaneously.
    if (this._populateTokensPromise) return this._populateTokensPromise
    this._populateTokensPromise = this._populateTokensNow(coilAuthToken)
    try {
      await this._populateTokensPromise
    } finally {
      this._populateTokensPromise = null
    }
  }

  private async _populateTokensNow(coilAuthToken?: string): Promise<void> {
    // Generate all tokens first so the timing in between tokens can't be used
    // to learn anything about the token or blinding factor.
    const tokens = GenerateNewTokens(this.batchSize)
    const issueRequest = BuildIssueRequest(tokens)

    const signPromise = this._signToken(issueRequest, coilAuthToken).then(
      async (issueResp: IssueResponse) => {
        const curvePoints = getCurvePoints(issueResp.sigs)

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

  private _storeNewTokens(
    tokens: BlindToken[],
    signedPoints: SjclEllipticalPoint[]
  ) {
    for (let i = 0; i < tokens.length; ++i) {
      const encoded = getTokenEncoding(tokens[i], signedPoints[i])
      void this.store.setItem(
        TOKEN_PREFIX + tokenName(tokens[i]),
        JSON.stringify(encoded)
      )
      this.storedTokenCount++
    }
  }

  private async _getCommitments(): Promise<Commitment[]> {
    const response = await portableFetch(this.redeemerUrl + '/commitments', {
      credentials: 'omit',
      method: 'GET'
    })
    if (!response.ok || response.status !== 200) {
      throw new Error(`_getCommitments failed with code=${response.status}`)
    }
    return response.json()
  }

  protected async _verifyProof(
    proof: string,
    prng: string,
    curvePoints: CurvePoints,
    tokens: BlindToken[]
  ) {
    const commitments = await this._getCommitments()
    const isValidProof = commitments.some(commitment => {
      return verifyProof(proof, tokens, curvePoints, commitment, prng)
    })
    if (!isValidProof) {
      throw new Error('[privacy pass]: unable to verify dleq proof.')
    }
  }
}
