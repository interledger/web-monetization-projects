import { BlindedToken } from '../../../crypto/voprf/types'
import { CryptoContext } from '../../../crypto/voprf/context'
import { IssueRequestSer } from '../../types/ser'
import { IssueRequestDes } from '../../types/des'
import { serializeIssueRequest } from '../../serdes'

export type IssueRequestReturn = {
  request: {
    des: IssueRequestDes
    ser: IssueRequestSer
  }
  tokens: BlindedToken[]
}

export function makeIssueRequest(
  context: CryptoContext,
  numTokens = 10
): IssueRequestReturn {
  const tokens: BlindedToken[] = []

  for (let i = 0; i < numTokens; i++) {
    const blindToken = context.createBlind()
    tokens.push(blindToken)
  }
  const des: IssueRequestDes = {
    contents: tokens.map(t => t.blindedPoint)
  }

  return {
    request: {
      des,
      ser: serializeIssueRequest(des)
    },
    tokens
  }
}
