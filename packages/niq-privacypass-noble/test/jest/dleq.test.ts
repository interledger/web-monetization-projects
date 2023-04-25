import { randomSecret } from '../../src/utils'
import { randomPoint } from '../../src/tokens'
import { DLEQ } from '../../src/dleq'

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
