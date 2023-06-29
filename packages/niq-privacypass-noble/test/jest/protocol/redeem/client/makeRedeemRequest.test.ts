import { describe, expect, it } from '@jest/globals'

import { makeRedeemRequest } from '../../../../../src/protocol/redeem/client/makeRedeemRequest'
import { SignedToken } from '../../../../../src/crypto/voprf/types'
import { testContext } from '../../../testconfig'
import { IssueResponseInnerSer } from '../../../../../src/protocol/types/ser'
import { b64dj } from '../../../../../src/crypto/voprf/b64'
import { wrapAndSerializeRequest } from '../../../../../src/protocol/serdes'
import { issueRequestUntyped, issueResponseRaw } from '../../fixtures'

describe('makeRedeemRequest', () => {
  it('should be possible to create a request to redeem a token', () => {
    const parsed: IssueResponseInnerSer = b64dj(issueResponseRaw)
    const signedPoints = parsed.sigs.map(testContext.b64dpt)

    const blindToken: SignedToken = {
      seed: issueRequestUntyped.tokens[0],
      blindedPoint: issueRequestUntyped.bP[0],
      blind: issueRequestUntyped.bF[0],
      signedPoint: signedPoints[0]
    }
    const { ser: request } = makeRedeemRequest(testContext, blindToken, '', '')
    const wrapped = wrapAndSerializeRequest(request)
    expect(wrapped).toMatchInlineSnapshot(
      `"{"bl_sig_req":"eyJ0eXBlIjoiUmVkZWVtIiwiY29udGVudHMiOlsiYlRPRERPVldrTlVXOFZLKzRhOEQxd3ViTXR6ODA0R0JQTTRlWUV0MElJZz0iLCJPZjBUL2tneWpVRk1mVlY0TUtwY1E3d2JmcnZVYWgvTUU1dDc3dmRoczNZPSJdfQ=="}"`
    )
  })
})
