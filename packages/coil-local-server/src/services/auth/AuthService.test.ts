import '@abraham/reflection'
import { makeDefaultContainer } from '../../di/container'

import { AuthService } from './AuthService'

describe('AuthService', () => {
  it('should pass simple sanity test', async () => {
    const container = makeDefaultContainer()
    const auth = container.get(AuthService)
    const payload = { userId: '1' }
    const signed = await auth.signJwt(payload)
    expect(typeof signed).toBe('string')
    const verified = await auth.assertJwtVerified(signed)
    expect(verified).toMatchObject(payload)
  })
})
