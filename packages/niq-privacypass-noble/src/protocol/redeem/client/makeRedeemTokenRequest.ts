import {
  BlindTokenRequestWrapper,
  RedeemTokenRequestSer
} from '../../types/ser'
import { CryptoContext } from '../../../crypto/context'
import { SignedToken } from '../../../crypto/types'
import { RedeemTokenRequestDes } from '../../types/des'
import { serializeRedeemTokenRequest, wrapRequest } from '../../serdes'

export function makeRedeemTokenRequest(
  context: CryptoContext,
  signedToken: SignedToken,
  //
  host: string,
  path: string
): {
  wrapped: BlindTokenRequestWrapper
  des: RedeemTokenRequestDes
  ser: RedeemTokenRequestSer
} {
  // Un-blind a point
  const xT = context.unblindPoint(signedToken.signedPoint, signedToken.blind)
  // Derive MAC key
  const sk = context.deriveKey(xT, signedToken.seed)

  // MAC the request binding data
  const reqData = [host, path]
  const reqBinder = context.createRequestBinding(sk, reqData)

  const des: RedeemTokenRequestDes = {
    token: signedToken.seed,
    requestBinding: reqBinder,
    host,
    path
  }

  const ser = serializeRedeemTokenRequest(des)
  const wrapped = wrapRequest(ser, { host, path })

  return {
    des: des,
    ser: ser,
    wrapped
  }
}
