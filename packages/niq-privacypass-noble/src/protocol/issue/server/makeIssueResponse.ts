import { IssueRequestDes, IssueResponseDes } from '../../types/des'
import { CryptoContext } from '../../../crypto/voprf/context'
import { Commitment } from '../../../crypto/voprf/types'
import { computeComposites } from '../../../crypto/voprf/computeComposites'
import { DLEQ } from '../../../crypto/voprf/dleq'
import { IssueResponseInnerSer } from '../../types/ser'
import { serializeIssueResponse } from '../../serdes'

export function makeIssueResponse(
  request: IssueRequestDes,
  key: bigint,
  commitment: Commitment,
  context: CryptoContext,
  keyVersion: string
): { des: IssueResponseDes; ser: IssueResponseInnerSer } {
  const sigs = request.contents.map(pt => {
    return context.signPoint(pt, key)
  })
  const composites = computeComposites(
    commitment.g,
    commitment.h,
    request.contents,
    sigs,
    context
  )
  const dleq = new DLEQ(context)
  const proof = dleq.create(commitment, composites.m, composites.z, key)
  const des = {
    proof,
    sigs,
    version: keyVersion
  }
  return { des, ser: serializeIssueResponse(des) }
}
