import { testContext } from '../../../testconfig'
import { commitment, serverKey, wrappedRedeemRequest } from '../../fixtures'
import { verifyRedeemRequest } from '../../../../../src/protocol/redeem/server/verifyRedeemRequest'
import { parseRedeemRequest } from '../../../../../src/protocol/serdes'

describe('verifyRedeemRequest', () => {
  const parsed = parseRedeemRequest(wrappedRedeemRequest)
  it('should start with having the right private key', () => {
    const signedG = testContext.signPoint(commitment.g, serverKey)
    expect(signedG.equals(commitment.h)).toBe(true)
  })
  it('should verify the request when using correct key', () => {
    const verified = verifyRedeemRequest(parsed, [serverKey], testContext)
    expect(verified).toBe(true)
  })
  it('should not verify the request when using incorrect key', () => {
    const verified = verifyRedeemRequest(
      parsed,
      [testContext.randomScalar()],
      testContext
    )
    expect(verified).toBe(false)
  })
  it('should not verify the request when using incorrect host/path', () => {
    const verified = verifyRedeemRequest(
      {
        ...parsed,
        host: 'bla.com',
        path: '/'
      },
      [serverKey],
      testContext
    )
    expect(verified).toBe(false)
  })
})
