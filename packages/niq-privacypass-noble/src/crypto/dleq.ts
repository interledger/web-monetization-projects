import { p256 } from '@noble/curves/p256'
import { mod } from '@noble/curves/abstract/modular'
import { randomBytes } from '@noble/hashes/utils'

import { H2Config, Point } from './types'
import {
  bytesToNumberBE,
  hashPointsBigInt,
  hashUncompressedPoints
} from './utils'
import { defaultConfig } from './configuration'
import { randScalar } from './randScalar'

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
    config: H2Config = defaultConfig
  ): DLEQProof {
    // TODO: this should use the H2Config curve config
    const { scalar: nonce } = randScalar(config.curve, randomBytes)
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
