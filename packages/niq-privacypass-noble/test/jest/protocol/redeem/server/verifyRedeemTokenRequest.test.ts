import { testContext } from '../../../testconfig'
import {
  commitment,
  serverKey,
  wrappedRedeemTokenRequest
} from '../../fixtures'
import { verifyRedeemTokenRequest } from '../../../../../src/protocol/redeem/server/verifyRedeemTokenRequest'
import { parseRedeemTokenRequest } from '../../../../../src/protocol/serdes'

describe('verifyRedeemRequest', () => {
  const parsed = parseRedeemTokenRequest(wrappedRedeemTokenRequest)
  it('should start with having the right private key', () => {
    const signedG = testContext.signPoint(commitment.g, serverKey)
    expect(signedG.equals(commitment.h)).toBe(true)
  })
  it('should verify if the request when using correct key', () => {
    const verified = verifyRedeemTokenRequest(parsed, [serverKey], testContext)
    expect(verified).toBe(true)
  })
  it('should not verify the request when using incorrect key', () => {
    const verified = verifyRedeemTokenRequest(
      parsed,
      [testContext.randomScalar()],
      testContext
    )
    expect(verified).toBe(false)
  })
  it('should not verify the request when using incorrect host/path', () => {
    const verified = verifyRedeemTokenRequest(
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
