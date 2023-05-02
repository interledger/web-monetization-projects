import { makeIssueTokenResponse } from '../../../src/protocol/issue/makeIssueTokenResponse'
import { testContext } from '../testconfig'
import { verifyIssueTokenResponse } from '../../../src/protocol/issue/verifyIssueTokenResponse'
import { parseIssueTokenResponse } from '../../../src/protocol/serdes'

import { commitment, issueResponse, issueTokenRequestDes } from './fixtures'

describe('makeIssueTokenResponse', () => {
  it('should be defined', () => {
    expect(makeIssueTokenResponse).toBeDefined()
  })
})

describe('verifyIssueTokenResponse', () => {
  it('should be possible to verify the response', () => {
    const parsed = parseIssueTokenResponse(issueResponse, testContext)
    const commitmentDes = { g: commitment.G, h: commitment.H }
    const verified = verifyIssueTokenResponse(
      issueTokenRequestDes,
      parsed,
      [commitmentDes],
      testContext
    )
    expect(verified).toBe(true)
  })
  it('should be not verify with incorrect commitment', () => {
    const parsed = parseIssueTokenResponse(issueResponse, testContext)
    const commitmentDes = { g: commitment.G, h: commitment.G.multiply(123n) }
    const verified = verifyIssueTokenResponse(
      issueTokenRequestDes,
      parsed,
      [commitmentDes],
      testContext
    )
    expect(verified).toBe(false)
  })
})
