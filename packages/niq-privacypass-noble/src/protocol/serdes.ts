import { b64db, b64dj, b64ej } from '../crypto/b64'

import {
  BlindTokenRequestSer,
  BlindTokenRequestWrapper,
  RedeemTokenRequestSer
} from './types/ser'
import { RedeemTokenRequestDes } from './types/des'

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
