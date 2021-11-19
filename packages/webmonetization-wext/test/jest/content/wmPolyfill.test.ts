import { createHash } from 'crypto'

import { wmPolyfill } from '@webmonetization/wext/content'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const knownHash = 'sha256-yIZC1zCuMNYot44p5pHYpNTZUYyCs46A38FkjRIpzr4='
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toBe(knownHash)
  })
})
