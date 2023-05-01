import { makeIssueTokenResponse } from '../../../src/protocol/issue/makeIssueTokenResponse'
import { IssueTokenResponse } from '../../../src/protocol/types'
import { DLEQ } from '../../../src/crypto/dleq'
import { computeComposites } from '../../../src/crypto/computeComposites'
import { testContext } from '../testconfig'

import { commitment, issueResponse, issueTokenRequest } from './fixtures'

const { b64db, b64dbn, b64dj, b64dpt, b64ds } = testContext

describe('makeIssueTokenResponse', () => {
  it('should be defined', () => {
    expect(makeIssueTokenResponse).toBeDefined()
  })
})

describe('verifyIssueTokenResponse', () => {
  it('should be possible to verify the response', () => {
    const parsed: IssueTokenResponse = b64dj(issueResponse)
    const signedPoints = parsed.sigs.map(v => b64dpt(v))
    const proof = JSON.parse(b64ds(parsed.proof).slice('batch-proof='.length))
    const P = b64dj(proof.P)
    const R = b64dbn(P.R)
    const C = b64db(P.C)

    const composites = computeComposites(
      commitment.G,
      commitment.H,
      issueTokenRequest.bP,
      signedPoints,
      testContext
    )

    const proved = DLEQ.prove(
      commitment.G,
      commitment.H,
      composites.m,
      composites.z,
      {
        c: C,
        r: R
      }
    )

    // mess it up
    const C2 = b64db(P.C)
    C2[0] = 0xff
    C2[C2.length - 1] = 0xff

    const notProved = DLEQ.prove(
      commitment.G,
      commitment.H,
      composites.m,
      composites.z,
      {
        c: C2,
        r: R
      }
    )

    expect(proved).toBe(true)
    expect(notProved).toBe(false)
  })
})
