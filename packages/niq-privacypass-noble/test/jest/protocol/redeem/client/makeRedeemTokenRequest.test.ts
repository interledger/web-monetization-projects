import { makeRedeemTokenRequest } from '../../../../../src/protocol/redeem/client/makeRedeemTokenRequest'
import { SignedToken } from '../../../../../src/crypto/voprf/types'
import { testContext } from '../../../testconfig'
import { IssueTokenResponseInnerSer } from '../../../../../src/protocol/types/ser'
import { b64dj } from '../../../../../src/crypto/voprf/b64'
import { wrapAndSerializeRequest } from '../../../../../src/protocol/serdes'
import { issueResponse, issueTokenRequest } from '../../fixtures'

describe('makeRedeemTokenRequest', () => {
  it('should be possible to create a request to redeem a token', () => {
    const parsed: IssueTokenResponseInnerSer = b64dj(issueResponse)
    const signedPoints = parsed.sigs.map(testContext.b64dpt)

    const blindToken: SignedToken = {
      seed: issueTokenRequest.tokens[0],
      blindedPoint: issueTokenRequest.bP[0],
      blind: issueTokenRequest.bF[0],
      signedPoint: signedPoints[0]
    }
    const { ser: request } = makeRedeemTokenRequest(
      testContext,
      blindToken,
      '',
      ''
    )
    const wrapped = wrapAndSerializeRequest(request)
    expect(wrapped).toMatchInlineSnapshot(
      `"{"bl_sig_req":"eyJ0eXBlIjoiUmVkZWVtIiwiY29udGVudHMiOlsiYlRPRERPVldrTlVXOFZLKzRhOEQxd3ViTXR6ODA0R0JQTTRlWUV0MElJZz0iLCJPZjBUL2tneWpVRk1mVlY0TUtwY1E3d2JmcnZVYWgvTUU1dDc3dmRoczNZPSJdfQ=="}"`
    )
  })
})
