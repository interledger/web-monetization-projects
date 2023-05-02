import { b64ej } from '../crypto/b64'

import { BlindTokenRequestSer, BlindTokenRequestWrapper } from './types/ser'

type RequestMeta = Pick<BlindTokenRequestWrapper, 'host' | 'path'>

export function wrapRequest(request: BlindTokenRequestSer, meta?: RequestMeta) {
  const value: BlindTokenRequestWrapper = {
    bl_sig_req: b64ej(request),
    ...meta
  }
  return JSON.stringify(value)
}
