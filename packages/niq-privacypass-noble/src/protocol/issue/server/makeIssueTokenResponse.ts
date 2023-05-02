import { IssueTokenRequestDes, IssueTokenResponseDes } from '../../types/des'
import { CryptoContext } from '../../../crypto/context'
import { Commitment } from '../../../crypto/types'
import { computeComposites } from '../../../crypto/computeComposites'
import { DLEQ } from '../../../crypto/dleq'
import { IssueTokenResponseInnerSer } from '../../types/ser'
import { serializeIssueTokenResponse } from '../../serdes'

export function makeIssueTokenResponse(
  request: IssueTokenRequestDes,
  key: bigint,
  commitment: Commitment,
  context: CryptoContext,
  keyVersion: string
): { des: IssueTokenResponseDes; ser: IssueTokenResponseInnerSer } {
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
  return { des, ser: serializeIssueTokenResponse(des) }
}
