import { createHash } from 'crypto'

import { wmPolyfill } from '@webmonetization/wext/content'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const knownHash = 'sha256-UlD5z/lTi/41Xzy6oHP2oSWSPWXV7kKneIJMC8Rs4IE='
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toBe(knownHash)
  })
})
