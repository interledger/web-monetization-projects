import { makeRedeemTokenRequest } from '../../../src/protocol/redeem/makeRedeemTokenRequest'
import { SignedToken } from '../../../src/crypto/types'
import { testContext } from '../testconfig'
import { IssueTokenResponse } from '../../../src/protocol/types'
import { b64dj } from '../../../src/crypto/b64'
import { wrapRequest } from '../../../src/protocol/serdes'

import { issueResponse, issueTokenRequest } from './fixtures'

describe('makeRedeemTokenRequest', () => {
  it('should be possible to create a request to redeem a token', () => {
    const parsed: IssueTokenResponse = b64dj(issueResponse)
    const signedPoints = parsed.sigs.map(testContext.decodePointB64)

    const blindToken: SignedToken = {
      seed: issueTokenRequest.tokens[0],
      point: issueTokenRequest.bP[0],
      blind: issueTokenRequest.bF[0],
      signedPoint: signedPoints[0]
    }
    const Empty = new Uint8Array(0)
    const request = makeRedeemTokenRequest(
      testContext,
      blindToken,
      Empty,
      Empty
    )
    const wrapped = wrapRequest(request)
    expect(wrapped).toMatchInlineSnapshot(
      `"{"bl_sig_req":"eyJ0eXBlIjoiUmVkZWVtIiwiY29udGVudHMiOlsiYlRPRERPVldrTlVXOFZLKzRhOEQxd3ViTXR6ODA0R0JQTTRlWUV0MElJZz0iLCJPZjBUL2tneWpVRk1mVlY0TUtwY1E3d2JmcnZVYWgvTUU1dDc3dmRoczNZPSJdfQ=="}"`
    )
  })
})
