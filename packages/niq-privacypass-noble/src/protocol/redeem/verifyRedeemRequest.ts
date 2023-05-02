import { RedeemTokenRequestDes } from '../types/des'
import { CryptoContext } from '../../crypto/context'

export function verifyRedeemRequest(
  req: RedeemTokenRequestDes,
  keys: bigint[],
  context: CryptoContext,
  host = '',
  path = ''
) {
  const token = req.token
  const requestBinder = req.requestBinding
  const T = context.config.hash2Curve(token)
  return keys.some(secret => {
    const sharedPoint = context.signPoint(T, secret)
    const sharedKey = context.deriveKey(sharedPoint, token)
    return context.checkRequestBinding(requestBinder, sharedKey, [host, path])
  })
}
