import { IssueTokenRequestDes, IssueTokenResponseDes } from '../../types/des'
import { CryptoContext } from '../../../crypto/context'
import { computeComposites } from '../../../crypto/computeComposites'
import { DLEQ } from '../../../crypto/dleq'
import { Commitment } from '../../../crypto/types'

export function verifyIssueTokenResponse(
  request: IssueTokenRequestDes,
  response: IssueTokenResponseDes,
  commitments: Commitment[],
  context: CryptoContext
) {
  const dleq = new DLEQ(context)

  return commitments.some(c => {
    const composites = computeComposites(
      c.g,
      c.h,
      // Blinded points
      request.contents,
      // Signed blinded points
      response.sigs,
      context
    )
    return dleq.prove(c, composites.m, composites.z, response.proof)
  })
}
