import { createHash } from 'crypto'

import { wmPolyfill } from '../../../src/content/wmPolyfill'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toMatchInlineSnapshot(
      `"sha256-eI5D03gj5d+dtlDcUYswoFH1Rsim440wGHFyJ2eE1lo="`
    )
  })
})
