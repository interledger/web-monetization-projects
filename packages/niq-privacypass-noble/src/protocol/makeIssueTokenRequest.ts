import { Point } from '../crypto/types'
import { b64ep } from '../b64'
import { BlindPoints } from '../crypto/tokens'

import { BlindTokenRequest } from './types'

export function makeIssueTokenRequest(points: BlindPoints): {
  request: BlindTokenRequest
  tokens: Uint8Array[]
  bP: Point[]
  bF: bigint[]
} {
  const tokens: Uint8Array[] = Array(10)
  const bF: bigint[] = Array(tokens.length)
  const bP: Point[] = Array(tokens.length)

  for (let i = 0; i < tokens.length; i++) {
    const blindToken = points.createBlind()
    tokens[i] = blindToken.seed
    bP[i] = blindToken.point
    bF[i] = blindToken.blind
  }

  const request: BlindTokenRequest = {
    type: 'Issue',
    contents: bP.map(b64ep)
  }

  return { request, tokens, bP, bF }
}
