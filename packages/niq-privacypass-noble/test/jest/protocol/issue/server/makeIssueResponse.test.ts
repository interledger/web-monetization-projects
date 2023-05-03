import { makeIssueRequest } from '../../../../../src/protocol/issue/client/makeIssueRequest'
import { testContext } from '../../../testconfig'
import { makeIssueResponse } from '../../../../../src/protocol/issue/server/makeIssueResponse'
import { commitment, serverKey } from '../../fixtures'
import { verifyIssueResponse } from '../../../../../src/protocol/issue/client/verifyIssueResponse'

describe('makeIssueResponse', () => {
  it('should be possible to verify a response', () => {
    const tokenRequest = makeIssueRequest(testContext)
    const { des: issueResponse } = makeIssueResponse(
      tokenRequest.request.des,
      serverKey,
      commitment,
      testContext,
      '1.0'
    )
    const verifyResponse = verifyIssueResponse(
      tokenRequest.request.des,
      issueResponse,
      [commitment],
      testContext
    )
    expect(verifyResponse).toBe(true)
  })
})
