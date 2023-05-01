import { p256 } from '@noble/curves/p256'
import { mod } from '@noble/curves/abstract/modular'

import { Point } from './types'
import {
  bytesToNumberBE,
  hashUncompressedPoints,
  hashPointsBigInt,
  randomSecret
} from './utils'

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
    x: bigint
  ): DLEQProof {
    // TODO: this should use the H2Config curve config
    const nonce = randomSecret()
    const A = p1.multiply(nonce)
    const B = p2.multiply(nonce)
    const challenge = hashUncompressedPoints(p1, xp1, p2, xp2, A, B)
    const c = bytesToNumberBE(challenge)
    const response = mod(nonce - c * x, p256.CURVE.n)
    return { c: challenge, r: response }
  }

  static prove(p1: Point, xp1: Point, p2: Point, xp2: Point, proof: DLEQProof) {
    const c = bytesToNumberBE(proof.c)
    const s = proof.r
    const A = p1.multiply(s).add(xp1.multiply(c))
    const B = p2.multiply(s).add(xp2.multiply(c))
    const rc = hashPointsBigInt(p1, xp1, p2, xp2, A, B)
    return c === rc
  }
}
