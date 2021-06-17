import { createHash } from 'crypto'

import { wmPolyfill } from '../../../src/content/wmPolyfill'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const knownHash = 'sha256-ZB4S3fpmqhkYmY2fAkJhOuCiCW9xtnSo9QaJPSzPH7Q='
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toBe(knownHash)
  })
})
