import { b64ej } from '../crypto/b64'

import { BlindTokenRequest, BlindTokenRequestWrapper } from './types'

type RequestMeta = Pick<BlindTokenRequestWrapper, 'host' | 'path'>

export function wrapRequest(request: BlindTokenRequest, meta?: RequestMeta) {
  const value: BlindTokenRequestWrapper = {
    bl_sig_req: b64ej(request),
    ...meta
  }
  return JSON.stringify(value)
}
