import { makeIssueRequest } from '../../../../../src/protocol/issue/client/makeIssueRequest'
import { testContext } from '../../../testconfig'

describe('makeIssueRequest', () => {
  it('should generate valid request and tokens', () => {
    const curve = testContext.config.curve
    const tokenRequest = makeIssueRequest(testContext, 10)
    const {
      request: { ser: request },
      tokens
    } = tokenRequest

    // Check request type
    expect(request.type).toBe('Issue')

    // Check token count
    expect(tokens.length).toBe(10)
    // Check token contents
    for (const token of tokens) {
      expect(token.seed).toBeInstanceOf(Uint8Array)
      expect(typeof token.blind).toBe('bigint')
      expect(token.blindedPoint).toBeInstanceOf(curve.ProjectivePoint)
    }
  })
})
