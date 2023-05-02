// makeIssueTokenRequest.test.ts
import { makeIssueTokenRequest } from '../../../src/protocol/issue/makeIssueTokenRequest'
import { testContext } from '../testconfig'
import { b64eb, b64ebn, b64ej, b64ept } from '../../../src/crypto/b64'

function logTokenRequest(
  tokenRequest: ReturnType<typeof makeIssueTokenRequest>
) {
  const { request, tokens, bP, bF } = tokenRequest
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        tokens: tokens.map(b64eb),
        bP: bP.map(b64ept),
        bF: bF.map(b64ebn)
      },
      null,
      2
    )
  )
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ bl_sig_req: b64ej(request) }))
}

describe('makeIssueTokenRequest', () => {
  it('should generate valid request and tokens', () => {
    const tokenRequest = makeIssueTokenRequest(testContext)
    const { request, tokens, bP, bF } = tokenRequest

    // Check request type
    expect(request.type).toBe('Issue')

    // Check token count
    expect(tokens.length).toBe(10)
    expect(bP.length).toBe(10)
    expect(bF.length).toBe(10)

    // Check token contents
    for (const token of tokens) {
      expect(token).toBeInstanceOf(Uint8Array)
    }

    // Check blind point and factor contents
    for (const pt of bP) {
      expect(pt).toBeDefined()
    }

    for (const bf of bF) {
      expect(bf).toBeDefined()
    }

    // Used to make fixtures to check response
    // logTokenRequest(tokenRequest)
  })
})
