import * as crypto from 'crypto'

import {
  hashAndInc,
  newRandomPointEl,
  randomBN
} from '@coil/privacypass-elliptic'
import * as elliptic from 'elliptic'
import BN from 'bn.js'

import { CURVE } from '../../src/curve'

const randomNumber = () => randomBN(CURVE.order)
const randomSecret = () => randomNumber()
const randomPoint = () => {
  const random = newRandomPointEl()
  return random.point
}

const hashPoints = (...pts: Point[]) => {
  const h = crypto.createHash('sha256')
  pts.forEach(pt => h.update(Buffer.from(pt.encodeCompressed())))
  return h.digest() //
}

type Point = elliptic.curve.base.BasePoint

const divPt = (pt: Point, divisor: BN) => {
  const divisorInverse = (divisor as any)._invmp(CURVE.order)
  return pt.mul(divisorInverse)
}

const HMAC = (key: Point, message: Buffer) => {
  const keyBuffer = Buffer.from(key.encodeCompressed())
  const mac = crypto.createHmac('sha256', keyBuffer)
  mac.update(message)
  return mac.digest()
}

class DLEQ {
  static create(p1: Point, xp1: Point, p2: Point, xp2: Point, x: BN) {
    const nonce = randomSecret()
    const A = p1.mul(nonce)
    const B = p2.mul(nonce)
    const challenge = hashPoints(p1, xp1, p2, xp2, A, B)
    const c = new BN(challenge)
    const response = nonce.sub(c.mul(x)).umod(CURVE.order)
    return { c: challenge, s: response }
  }

  static prove(
    p1: Point,
    xp1: Point,
    p2: Point,
    xp2: Point,
    proof: { c: Buffer; s: BN }
  ) {
    const c = new BN(proof.c)
    const A = p1.mul(proof.s).add(xp1.mul(c))
    const B = p2.mul(proof.s).add(xp2.mul(c))
    const rc = hashPoints(p1, xp1, p2, xp2, A, B)
    return proof.c.equals(rc)
  }
}

describe('PrivacyPass Scenarios as code scribbles', () => {
  it('should describe scenario 1 - linkability', () => {
    // ### client issue request
    const T = randomPoint()
    const creds = 'trackMe'
    // The client takes a point on an elliptic curve T and sends it to the server.
    const issueRequest = { T, creds }

    // ### server issue response
    const s = randomSecret()
    // The server applies a secret transformation
    // (multiplication by a secret number s)
    const sT = issueRequest.T.mul(s)
    // and sends it back.
    const issueResponse = { sT }
    // Cheekily we keep track of theses issues
    const trackerDB = new Map([[issueRequest.T, issueRequest.creds]])

    // ### client redeem request
    const redeemRequest = { sT: issueResponse.sT, T }

    // ### server redeem response
    expect(redeemRequest.T.mul(s).eq(redeemRequest.sT)).toBe(true)
    // ## Problem: Linkability
    // In this situation, the server knows T because it has seen it already.
    // This lets the server connect the two requests, something we’re trying to avoid.
    // This is where we introduce the blinding factor.
    // Unfortunately we *can* track them
    expect(trackerDB.get(redeemRequest.T)).toEqual('trackMe')
  })
  it('should describe scenario 2 - malleability', () => {
    const creds = 'trackMe'

    // ### client issue request
    const T = randomPoint()
    // Rather than sending T, the client generates its own secret number b.
    const b = randomSecret()
    // The client multiplies the point T by b
    const bT = T.mul(b)
    // before sending it to the server
    const issueRequest = { bT, creds }

    // ### server issue response
    const s = randomSecret()
    // The server does the same thing as in scenario 1
    // (multiplies the point it receives by s).
    // s(bT)
    const sbT = issueRequest.bT.mul(s)
    const issueResponse = { sbT }

    // The client knows b.
    // noinspection UnnecessaryLocalVariableJS
    const knownB = b
    // s(bT) is equal to b(sT) because multiplication is
    // commutative.
    {
      const sT = T.mul(s)
      // b(sT)
      const bsT = sT.mul(knownB)
      expect(sbT.eq(bsT)).toBe(true)
    }

    // The client can compute sT from b(sT) by dividing by b.
    const bInverse = (knownB as any)._invmp(CURVE.order)
    // TODO: why does the above work ??

    // we can divide by b by multiplying by its inverse
    const sT = issueResponse.sbT.mul(bInverse)
    // works both ways
    expect(sT.mul(b).eq(sbT)).toBe(true)

    const redeemRequest = { T, sT }
    // Since only the server knows s, it can confirm that sT
    // is T multiplied by s and will verify the redemption.
    expect(redeemRequest.T.mul(s).eq(redeemRequest.sT)).toBe(true)

    // Problem: Malleability
    {
      const a = randomSecret()
      const aT = redeemRequest.T.mul(a)
      const aST = redeemRequest.sT.mul(a)
      expect(aT.mul(s).eq(aST)).toBe(true)
    }
  })
  it('should describe scenario 3 - redemption hijacking', () => {
    const creds = 'trackMe'
    // Instead of picking an arbitrary point T, the client can pick a number t.
    const t = randomNumber()
    const b = randomSecret()
    // The point T can be derived by hashing t to a point
    // on the curve using a one-way hash.
    const T = hashAndInc(t.toBuffer())

    // ### Client Issue Request
    const bT = T.mul(b)
    const issueRequest = { bT, creds }

    // ### Server Issue Response
    const s = randomSecret()
    const sbT = issueRequest.bT.mul(s)
    const issueResponse = { sbT }

    // ### Client Redeem Request
    const sT = divPt(issueResponse.sbT, b)
    const redeemRequest = { t, sT }

    // ### Server Redeem Response
    {
      const recomputedT = hashAndInc(t.toBuffer())
      expect(recomputedT.mul(s).eq(redeemRequest.sT)).toBe(true)
    }

    // The hash guarantees that it’s hard to find another
    // number that hashes to aT for an arbitrary a.
    {
      //
    }
    // ## Problem: Redemption hijacking
    // If the values t and sT are sent across an unsecured network,
    // an adversary could take them and use them for their own redemption.

    // Sending sT is what lets attackers hijack a redemption.

    // Since the server can calculate sT from t on it’s own,
    // the client doesn’t actually need to send it.
    // All the client needs to do is prove that it knows sT.

    // A trick for doing this is to use t and sT to derive a HMAC key
    // and use it to sign a message that relates to the redemption.

    // Without seeing sT, the attacker will not be able to take this redemption
    // and use it for a different message because it won’t be able to compute
    // the HMAC key
  })

  it('should describe scenario 4 - tagging', () => {
    // Instead of sending t and sT the client can send t and
    // HMAC(sT, M) for a message M.

    // When the server receives this, it calculates T = Hash(t), then uses
    // its secret value to compute sT

    /// With t and sT it can generate the HMAC key and check the signature.

    // If the signature matches, that means the client knew sT.

    const creds = 'trackMe'
    const b = randomSecret()
    const t = randomSecret()
    const T = hashAndInc(t.toBuffer())
    const bT = T.mul(b)

    // ### Client Issue Request
    const issueRequest = { bT, creds }

    // ### Server Issue Response
    const s = randomSecret()
    const sbT = issueRequest.bT.mul(s)
    const issueResponse = { sbT }

    // ### Client Redeem Request
    const msg = Buffer.from('in a bottle')
    const sT = divPt(issueResponse.sbT, b)
    const redeemRequest = { t, M: msg, mac: HMAC(sT, msg) }

    // ### Server Redeem Validation
    {
      const T = hashAndInc(redeemRequest.t.toBuffer())
      const sT = T.mul(s)
      const mac = HMAC(sT, redeemRequest.M)
      expect(mac).toEqual(redeemRequest.mac)
    }

    // Problem: Tagging
    // The server can use a different s for each client, say s1 for client 1
    // and s2 for client 2. Then the server can identify the client by comparing
    // s_1(H(t)) and s_2(H(t)) against the sT submitted by the client and seeing
    // which one matches.

    // This is where we introduce a zero-knowledge proof. We'll go into more
    // detail about how these work in a later blog post. The specific proof
    // we're using called a discrete logarithm equivalence proof (DLEQ)

    // Those lucky enough to take the SAT before 2005 may remember the analogy
    // section. You can think of a DLEQ proof in terms of an SAT analogy.
    // It proves that two pairs of items are related to each other in in a
    // similar way

    // For example: puppies are to dogs as kittens are to cats. A kitten is a
    // young cat and a puppy is a young dog. You can represent this with the
    // following notation: puppy:dog == kitten:cat

    // A DLEQ proves that two elliptic curve points are related by the same
    // multiplicative factor without revealing that factor. Say you have a number
    // s and two points P and Q. Someone with knowledge of s can construct a proof
    // DLEQ(P:sP === Q:sQ). A third party with access to P, sP, Q, sQ can use
    // DLEQ(P:sP === Q:sQ) to verify that the same value s was used without knowing
    // what s is.
  })

  it('should describe scenario 5 - only one redemption per issuance', () => {
    // The server picks a generator point G and publishes sG somewhere
    // where every client knows it.

    // Server side
    const x = randomSecret()
    const G = randomPoint() // commitment
    const sG = G.mul(x) // publically signed commitment, referred to as `H`

    // ### Client Issue Request
    const b = randomSecret()
    const t = crypto.randomBytes(32)
    const T = hashAndInc(t)
    const bT = T.mul(b)
    const issueRequest = { bT }

    /// Server Issue Response
    const sBT = issueRequest.bT.mul(x)
    const k = randomSecret() // nonce
    const A = G.mul(k)
    const B = issueRequest.bT.mul(k)
    const c = hashPoints(G, sG, issueRequest.bT, sBT, A, B)
    const cn = new BN(c)
    const s = k.sub(cn.mul(x)).umod(CURVE.order)
    const DLEQ = { c, s }
    const issueResponse = { sBT, DLEQ }

    // Client verify
    {
      const {
        sBT,
        DLEQ: { c, s }
      } = issueResponse
      const cn = new BN(c)
      const A2 = G.mul(s).add(sG.mul(cn))
      const B2 = bT.mul(s).add(sBT.mul(cn))
      const c2 = hashPoints(G, sG, bT, sBT, A2, B2)
      expect(A.eq(A2)).toBe(true)
      expect(B.eq(B2)).toBe(true)
      expect(c.equals(c2)).toBe(true)
    }
    // Problem: only one redemption per issuance
    // This system seems to have all the properties we want,
    // but it would be nice to be able to get multiple points
  })

  it('should describe scenario 6 - problem bandwidth', () => {
    // as above but just send more than one point at a time
  })

  it('should describe scenario 7', () => {
    const secretKey = randomSecret()
    const G = randomPoint()
    const H = G.mul(secretKey)

    const t1 = randomNumber()
    const t2 = randomNumber()
    const t3 = randomNumber()

    const b1 = randomSecret()
    const b2 = randomSecret()
    const b3 = randomSecret()

    const T1 = hashAndInc(t1.toBuffer())
    const T2 = hashAndInc(t2.toBuffer())
    const T3 = hashAndInc(t3.toBuffer())

    const b1T1 = T1.mul(b1)
    const b2T2 = T2.mul(b2)
    const b3T3 = T3.mul(b3)

    const addedBlindedPoints = b1T1.add(b2T2).add(b3T3)

    const aS = b1T1.mul(secretKey)
    const bS = b2T2.mul(secretKey)
    const cS = b3T3.mul(secretKey)

    const signedIndividually = aS.add(bS).add(cS)
    const signedAddedBlindPoints = addedBlindedPoints.mul(secretKey)
    const isEq = signedAddedBlindPoints.eq(signedIndividually)
    expect(isEq).toBe(true)

    const proof = DLEQ.create(
      G,
      H,
      addedBlindedPoints,
      signedAddedBlindPoints,
      secretKey
    )
    const proved = DLEQ.prove(
      G,
      H,
      addedBlindedPoints,
      signedAddedBlindPoints,
      proof
    )
    expect(proved).toBe(true)

    // TODO: Without using the random linear combinations the proof is insecure.
  })
})

describe('DLEQ proofs', () => {
  it('should describe DLEQ ', () => {
    // https://blog.cloudflare.com/privacy-pass-the-math/
    // See DLEQ proofs
    // Servers secret
    const x = randomSecret()

    // Servers Commitment
    const G = randomPoint()
    const H = G.mul(x)

    // The blinded token point as submitted by the client
    const M = randomPoint()
    // The Server signed token point
    const Z = M.mul(x)

    const proof = DLEQ.create(G, H, M, Z, x)
    const verified = DLEQ.prove(G, H, M, Z, proof)
    expect(verified).toBe(true)
  })
})
