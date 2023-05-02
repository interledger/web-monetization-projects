import { BlindTokenRequest } from '../types'
import { CryptoContext } from '../../crypto/context'
import { SignedToken } from '../../crypto/types'
import { b64eb } from '../../crypto/b64'

export function makeRedeemTokenRequest(
  context: CryptoContext,
  signedToken: SignedToken,
  //
  host: Uint8Array,
  path: Uint8Array
): BlindTokenRequest {
  // Unblind a point
  const xT = context.unblindPoint(signedToken.signedPoint, signedToken.blind)
  // Derive MAC key
  const sk = context.deriveKey(xT, signedToken.seed)

  // MAC the request binding data
  const reqData = [host, path]
  const reqBinder = context.createRequestBinding(sk, reqData)
  const contents = [signedToken.seed, reqBinder]

  const redeemRequest: BlindTokenRequest = {
    type: 'Redeem',
    contents: contents.map(content => b64eb(content))
  }

  return redeemRequest
}
