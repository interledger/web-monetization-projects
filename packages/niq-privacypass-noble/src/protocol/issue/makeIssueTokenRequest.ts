import { Point } from '../../crypto/types'
import { CryptoContext } from '../../crypto/context'
import { BlindTokenRequestSer } from '../types/ser'
import { b64ept } from '../../crypto/b64'

export type TokenRequestReturn = {
  request: BlindTokenRequestSer
  tokens: Uint8Array[]
  bP: Point[]
  bF: bigint[]
}

export function makeIssueTokenRequest(
  context: CryptoContext
): TokenRequestReturn {
  const numTokens = 10

  const result: TokenRequestReturn = {
    request: {
      type: 'Issue',
      contents: []
    },
    tokens: [],
    bF: [],
    bP: []
  }

  for (let i = 0; i < numTokens; i++) {
    const blindToken = context.createBlind()
    result.tokens.push(blindToken.seed)
    result.bF.push(blindToken.blind)
    result.bP.push(blindToken.point)
    result.request.contents.push(b64ept(blindToken.point))
  }

  return result
}
