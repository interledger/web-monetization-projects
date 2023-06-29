import { describe, expect, it } from '@jest/globals'

import { makeIssueResponse } from '../../../../../src/protocol/issue/server/makeIssueResponse'
import { testContext } from '../../../testconfig'
import { verifyIssueResponse } from '../../../../../src/protocol/issue/client/verifyIssueResponse'
import { parseIssueResponse } from '../../../../../src/protocol/serdes'
import { commitment, issueRequestDes, issueResponseRaw } from '../../fixtures'

describe('makeIssueResponse', () => {
  it('should be defined', () => {
    expect(makeIssueResponse).toBeDefined()
  })
})

describe('verifyIssueResponse', () => {
  it('should be possible to verify the response', () => {
    const parsed = parseIssueResponse(issueResponseRaw, testContext)
    const verified = verifyIssueResponse(
      issueRequestDes,
      parsed,
      [commitment],
      testContext
    )
    expect(verified).toBe(true)
  })
  it('should be not verify with incorrect commitment', () => {
    const parsed = parseIssueResponse(issueResponseRaw, testContext)
    const bustedCommitment = { g: commitment.g, h: commitment.g }
    const verified = verifyIssueResponse(
      issueRequestDes,
      parsed,
      [bustedCommitment],
      testContext
    )
    expect(verified).toBe(false)
  })
})
