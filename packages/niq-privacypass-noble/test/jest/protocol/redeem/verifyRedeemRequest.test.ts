import { testContext } from '../../testconfig'
import { commitment, serverKey, wrappedRedeemTokenRequest } from '../fixtures'
import { verifyRedeemRequest } from '../../../../src/protocol/redeem/verifyRedeemRequest'
import { parseRedeemRequest } from '../../../../src/protocol/serdes'

describe('verifyRedeemRequest', () => {
  const parsed = parseRedeemRequest(wrappedRedeemTokenRequest)
  it('should start with having the right private key', () => {
    const signedG = testContext.signPoint(commitment.G, serverKey)
    expect(signedG.equals(commitment.H)).toBe(true)
  })
  it('should verify if the request when using correct key', () => {
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
      parsed,
      [serverKey],
      testContext,
      'bla.com',
      '/'
    )
    expect(verified).toBe(false)
  })
})
