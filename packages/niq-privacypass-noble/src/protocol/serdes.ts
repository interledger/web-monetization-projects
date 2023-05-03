import {
  b64db,
  b64dbn,
  b64dj,
  b64ds,
  b64eb,
  b64ebn,
  b64ej,
  b64ept,
  b64es
} from '../crypto/voprf/b64'
import { CryptoContext } from '../crypto/voprf/context'

import {
  BlindTokenRequestSer,
  BlindTokenRequestWrapper,
  IssueTokenRequestSer,
  IssueTokenResponseInnerSer,
  RedeemTokenRequestSer,
  RequestMeta
} from './types/ser'
import {
  IssueTokenRequestDes,
  IssueTokenResponseDes,
  RedeemTokenRequestDes
} from './types/des'

const BATCH_PROOF_HEADER = 'batch-proof='

export function wrapRequest(request: BlindTokenRequestSer, meta?: RequestMeta) {
  const value: BlindTokenRequestWrapper = {
    bl_sig_req: b64ej(request),
    ...meta
  }
  return value
}

export function wrapAndSerializeRequest(
  request: BlindTokenRequestSer,
  meta?: RequestMeta
) {
  return JSON.stringify(wrapRequest(request, meta))
}

export function unwrapRequest<T>(request: string): {
  unwrapped: T
  meta: RequestMeta
} {
  const value = JSON.parse(request) as BlindTokenRequestWrapper
  const meta = {
    path: value.path ?? '',
    host: value.host ?? ''
  }
  return { unwrapped: b64dj(value.bl_sig_req) as T, meta }
}

export function parseRedeemTokenRequest(
  request: string
): RedeemTokenRequestDes {
  const { unwrapped, meta } = unwrapRequest<RedeemTokenRequestSer>(request)
  return {
    token: b64db(unwrapped.contents[0]),
    requestBinding: b64db(unwrapped.contents[1]),
    ...meta
  }
}

export function parseIssueTokenRequest(
  request: string,
  context: CryptoContext
): IssueTokenRequestDes {
  const { unwrapped } = unwrapRequest<IssueTokenRequestSer>(request)
  return {
    contents: unwrapped.contents.map(context.b64dpt)
  }
}

export function serializeRedeemTokenRequest(
  request: RedeemTokenRequestDes
): RedeemTokenRequestSer {
  return {
    type: 'Redeem',
    contents: [b64eb(request.token), b64eb(request.requestBinding)]
  }
}

export function serializeIssueTokenRequest(
  request: IssueTokenRequestDes
): IssueTokenRequestSer {
  return {
    type: 'Issue',
    contents: request.contents.map(b64ept)
  }
}

export function serializeIssueTokenResponse(
  response: IssueTokenResponseDes
): IssueTokenResponseInnerSer {
  const proof = {
    P: b64ej({
      C: b64eb(response.proof.c),
      R: b64ebn(response.proof.r)
    })
  }
  return {
    sigs: response.sigs.map(b64ept),
    version: response.version,
    proof: b64es(BATCH_PROOF_HEADER + JSON.stringify(proof))
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
