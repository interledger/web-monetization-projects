import { RedeemRequestDes } from '../../types/des'
import { CryptoContext } from '../../../crypto/voprf/context'

export function verifyRedeemRequest(
  req: RedeemRequestDes,
  keys: bigint[],
  context: CryptoContext
) {
  const token = req.token
  const requestBinder = req.requestBinding
  const T = context.config.hash2Curve(token)
  return keys.some(secret => {
    const sharedPoint = context.signPoint(T, secret)
    const sharedKey = context.deriveKey(sharedPoint, token)
    return context.checkRequestBinding(requestBinder, sharedKey, [
      req.host,
      req.path
    ])
  })
}
