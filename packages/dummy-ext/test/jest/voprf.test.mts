import { randomBytes } from 'node:crypto'

import { describe, expect, it } from '@jest/globals'
import { generateKeyPair, Oprf, VOPRFClient } from '@cloudflare/voprf-ts'

describe('ESM Works', () => {
  it('should be importable', async () => {
    const suite = Oprf.Suite.P256_SHA256
    const serverPair = await generateKeyPair(suite)
    const client = new VOPRFClient(suite, serverPair.publicKey)
    const token = randomBytes(32)
    const [finalize, evalRequest] = await client.blind([token])
    expect(finalize).not.toBeUndefined()
  })
})
