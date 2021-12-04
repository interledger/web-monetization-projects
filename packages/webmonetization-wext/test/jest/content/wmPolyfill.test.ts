import { createHash } from 'crypto'

import { wmPolyfill } from '../../../src/content/wmPolyfill'

describe('wmPolyfill', () => {
  // TODO
  console.log(wmPolyfill)
  it.skip('should generate a known hash for the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toMatchInlineSnapshot()
  })
})
