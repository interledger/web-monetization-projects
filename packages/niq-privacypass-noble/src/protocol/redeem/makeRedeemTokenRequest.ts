import { BlindTokenRequest } from '../types'
import { CryptoContext } from '../../crypto/context'
import { SignedToken } from '../../crypto/types'

export function makeRedeemTokenRequest(
  context: CryptoContext,
  blindToken: SignedToken,
  testHost: Uint8Array,
  testPath: Uint8Array
): BlindTokenRequest {
  // Unblind a point
  const token = blindToken.seed
  const blindedPoint = blindToken.signedPoint
  const blindFactor = blindToken.blind

  const xT = context.unblindPoint(blindedPoint, blindFactor)
  // Derive MAC key
  const sk = context.deriveKey(xT, token)

  // MAC the request binding data
  const reqData = [testHost, testPath]
  const reqBinder = context.createRequestBinding(sk, reqData)
  const contents = [token, reqBinder]

  const redeemRequest: BlindTokenRequest = {
    type: 'Redeem',
    contents: contents.map(content => context.b64eb(content))
  }

  return redeemRequest
}
