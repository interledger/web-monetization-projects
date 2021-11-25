import { createHash } from 'crypto'

import { wmPolyfill } from '@webmonetization/wext/content'

describe('wmPolyfill', () => {
  it('should generate a known hash for the manifest', () => {
    const data = Buffer.from(wmPolyfill, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const rebuilt = `sha256-${digest.toString('base64')}`
    expect(rebuilt).toMatchInlineSnapshot(
      `"sha256-lse3+u9LXPK436ejKm318NpFs8hXM8yYP/qGvvhTA0g="`
    )
  })
})
