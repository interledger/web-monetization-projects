import { createHash } from 'crypto'

import { wmPolyfill } from '@webmonetization/wext/content'

import * as manifest from '../../manifest.json'

describe('Web-Monetization Polyfill', () => {
  it('should list the correct hash in the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(manifest.content_security_policy).toContain(rebuilt)
  })
})
