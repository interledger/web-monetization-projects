import { BlindedToken } from '../../crypto/types'
import { CryptoContext } from '../../crypto/context'
import { BlindTokenRequestSer } from '../types/ser'
import { b64ept } from '../../crypto/b64'

export type TokenRequestReturn = {
  request: BlindTokenRequestSer
  tokens: BlindedToken[]
}

export function makeIssueTokenRequest(
  context: CryptoContext,
  numTokens = 10
): TokenRequestReturn {
  const result: TokenRequestReturn = {
    request: {
      type: 'Issue',
      contents: []
    },
    tokens: []
  }

  for (let i = 0; i < numTokens; i++) {
    const blindToken = context.createBlind()
    result.tokens.push(blindToken)
    result.request.contents.push(b64ept(blindToken.blindedPoint))
  }

  return result
}
