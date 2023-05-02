import { RedeemTokenRequestSer } from '../types/ser'
import { CryptoContext } from '../../crypto/context'
import { Hashable, SignedToken } from '../../crypto/types'
import { b64eb } from '../../crypto/b64'

export function makeRedeemTokenRequest(
  context: CryptoContext,
  signedToken: SignedToken,
  //
  host: Hashable,
  path: Hashable
): RedeemTokenRequestSer {
  // Un-blind a point
  const xT = context.unblindPoint(signedToken.signedPoint, signedToken.blind)
  // Derive MAC key
  const sk = context.deriveKey(xT, signedToken.seed)

  // MAC the request binding data
  const reqData = [host, path]
  const reqBinder = context.createRequestBinding(sk, reqData)

  return {
    type: 'Redeem',
    contents: [b64eb(signedToken.seed), b64eb(reqBinder)]
  }
}
