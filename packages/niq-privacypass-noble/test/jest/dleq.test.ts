import { randomSecret } from '../../src/crypto/utils'
import { DLEQ } from '../../src/crypto/dleq'

import { randomPoint } from './tokens'

describe('DLEQ proofs', () => {
  it('should describe DLEQ', () => {
    // https://blog.cloudflare.com/privacy-pass-the-math/
    // See DLEQ proofs
    // Servers secret
    const x = randomSecret()

    // Servers Commitment
    const G = randomPoint()
    const H = G.multiply(x)

    // The blinded token point as submitted by the client
    const M = randomPoint()
    // The Server signed token point
    const Z = M.multiply(x)

    const proof = DLEQ.create(G, H, M, Z, x)
    const verified = DLEQ.prove(G, H, M, Z, proof)
    expect(verified).toBe(true)
  })
})
