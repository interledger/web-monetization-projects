import { randomBytes } from 'node:crypto'

import { jest } from '@jest/globals'
import { Oprf, VOPRFClient, generateKeyPair } from '@cloudflare/voprf-ts'

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
