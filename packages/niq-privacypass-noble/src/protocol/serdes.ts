import { b64db, b64dbn, b64dj, b64ds, b64ej } from '../crypto/b64'
import { CryptoContext } from '../crypto/context'

import {
  BlindTokenRequestSer,
  BlindTokenRequestWrapper,
  IssueTokenResponseInnerSer,
  RedeemTokenRequestSer
} from './types/ser'
import { IssueTokenResponseDes, RedeemTokenRequestDes } from './types/des'

const BATCH_PROOF_HEADER = 'batch-proof='

type RequestMeta = Pick<BlindTokenRequestWrapper, 'host' | 'path'>

export function wrapRequest(request: BlindTokenRequestSer, meta?: RequestMeta) {
  const value: BlindTokenRequestWrapper = {
    bl_sig_req: b64ej(request),
    ...meta
  }
  return JSON.stringify(value)
}

export function parseRedeemRequest(request: string): RedeemTokenRequestDes {
  const value = JSON.parse(request) as BlindTokenRequestWrapper
  const unwrapped = b64dj(value.bl_sig_req) as RedeemTokenRequestSer
  return {
    token: b64db(unwrapped.contents[0]),
    requestBinding: b64db(unwrapped.contents[1])
  }
}

export function parseIssueTokenResponse(
  response: string,
  context: CryptoContext
): IssueTokenResponseDes {
  const inner = b64dj(response) as IssueTokenResponseInnerSer
  const sig = inner.sigs.map(context.b64dpt)

  const proofString = b64ds(inner.proof)
  const proof = JSON.parse(proofString.slice(BATCH_PROOF_HEADER.length))
  const P = b64dj(proof.P)
  const r = b64dbn(P.R)
  const c = b64db(P.C)

  return {
    sigs: sig,
    proof: { r, c },
    version: inner.version
  }
}
