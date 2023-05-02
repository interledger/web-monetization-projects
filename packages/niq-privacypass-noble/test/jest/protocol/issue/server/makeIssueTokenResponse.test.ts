import { makeIssueTokenRequest } from '../../../../../src/protocol/issue/client/makeIssueTokenRequest'
import { testContext } from '../../../testconfig'
import { makeIssueTokenResponse } from '../../../../../src/protocol/issue/server/makeIssueTokenResponse'
import { commitment, serverKey } from '../../fixtures'
import { verifyIssueTokenResponse } from '../../../../../src/protocol/issue/client/verifyIssueTokenResponse'

describe('makeIssueTokenResponse', () => {
  it('should be possible to verify a response', () => {
    const tokenRequest = makeIssueTokenRequest(testContext)
    const { des: issueResponse } = makeIssueTokenResponse(
      tokenRequest.request.des,
      serverKey,
      commitment,
      testContext,
      '1.0'
    )
    const verifyResponse = verifyIssueTokenResponse(
      tokenRequest.request.des,
      issueResponse,
      [commitment],
      testContext
    )
    expect(verifyResponse).toBe(true)
  })
})
