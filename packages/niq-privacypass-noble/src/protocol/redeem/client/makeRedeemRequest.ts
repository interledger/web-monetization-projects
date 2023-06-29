import { PrivacyPassRequestWrapper, RedeemRequestSer } from '../../types/ser'
import { CryptoContext } from '../../../crypto/voprf/context'
import { SignedToken } from '../../../crypto/voprf/types'
import { RedeemRequestDes } from '../../types/des'
import { serializeRedeemRequest, wrapRequest } from '../../serdes'

export function makeRedeemRequest(
  context: CryptoContext,
  signedToken: SignedToken,
  //
  host: string,
  path: string
): {
  wrapped: PrivacyPassRequestWrapper
  des: RedeemRequestDes
  ser: RedeemRequestSer
} {
  // Un-blind a point
  const xT = context.unblindPoint(signedToken.signedPoint, signedToken.blind)
  // Derive MAC key
  const sk = context.deriveKey(xT, signedToken.seed)

  // MAC the request binding data
  const reqData = [host, path]
  const reqBinder = context.createRequestBinding(sk, reqData)

  const des: RedeemRequestDes = {
    token: signedToken.seed,
    requestBinding: reqBinder,
    host,
    path
  }

  const ser = serializeRedeemRequest(des)
  const wrapped = wrapRequest(ser, { host, path })

  return {
    des: des,
    ser: ser,
    wrapped
  }
}
