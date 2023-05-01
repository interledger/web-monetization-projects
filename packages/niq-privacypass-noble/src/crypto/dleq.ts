import { p256 } from '@noble/curves/p256'
import { mod } from '@noble/curves/abstract/modular'
import { randomBytes } from '@noble/hashes/utils'
import { bytesToNumberBE } from '@noble/curves/abstract/utils'

import { Point } from './types'
import { defaultContext } from './config'
import { randScalar } from './randScalar'
import { CryptoContext } from './context'

export interface DLEQProof {
  c: Uint8Array
  r: bigint
}

export class DLEQ {
  static create(
    p1: Point,
    xp1: Point,
    p2: Point,
    xp2: Point,
    x: bigint,
    context: CryptoContext = defaultContext
  ): DLEQProof {
    // TODO: this should use the H2Config curve config
    const { scalar: nonce } = randScalar(context.config.curve, randomBytes)
    const A = p1.multiply(nonce)
    const B = p2.multiply(nonce)
    const challenge = context.hashUncompressedPoints(p1, xp1, p2, xp2, A, B)
    const c = bytesToNumberBE(challenge)
    const response = mod(nonce - c * x, p256.CURVE.n)
    return { c: challenge, r: response }
  }

  static prove(
    p1: Point,
    xp1: Point,
    p2: Point,
    xp2: Point,
    proof: DLEQProof,
    context: CryptoContext = defaultContext
  ) {
    const c = bytesToNumberBE(proof.c)
    const s = proof.r
    const A = p1.multiply(s).add(xp1.multiply(c))
    const B = p2.multiply(s).add(xp2.multiply(c))
    const rc = context.hashPointsBigInt(p1, xp1, p2, xp2, A, B)
    return c === rc
  }
}
