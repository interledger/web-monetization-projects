import { IssueTokenRequestDes, IssueTokenResponseDes } from '../../types/des'
import { CryptoContext } from '../../../crypto/voprf/context'
import { computeComposites } from '../../../crypto/voprf/computeComposites'
import { DLEQ } from '../../../crypto/voprf/dleq'
import { Commitment } from '../../../crypto/voprf/types'

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
