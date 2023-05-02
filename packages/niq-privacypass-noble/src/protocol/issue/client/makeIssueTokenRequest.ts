import { BlindedToken } from '../../../crypto/types'
import { CryptoContext } from '../../../crypto/context'
import { IssueTokenRequestSer } from '../../types/ser'
import { IssueTokenRequestDes } from '../../types/des'
import { serializeIssueTokenRequest } from '../../serdes'

export type TokenRequestReturn = {
  request: {
    des: IssueTokenRequestDes
    ser: IssueTokenRequestSer
  }
  tokens: BlindedToken[]
}

export function makeIssueTokenRequest(
  context: CryptoContext,
  numTokens = 10
): TokenRequestReturn {
  const tokens: BlindedToken[] = []

  for (let i = 0; i < numTokens; i++) {
    const blindToken = context.createBlind()
    tokens.push(blindToken)
  }
  const des: IssueTokenRequestDes = {
    contents: tokens.map(t => t.blindedPoint)
  }

  return {
    request: {
      des,
      ser: serializeIssueTokenRequest(des)
    },
    tokens
  }
}
