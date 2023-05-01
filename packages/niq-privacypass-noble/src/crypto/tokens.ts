// src/crypto/blindPoints.ts
import { randomBytes } from '@noble/hashes/utils'
import { invert } from '@noble/curves/abstract/modular'

import { BlindToken, H2Config, Point } from './types'
import { randScalar } from './randScalar'

export class BlindPoints {
  constructor(private config: H2Config) {}

  blind(p: Point): { point: Point; blind: bigint } {
    const { scalar: r, buf } = randScalar(this.config.curve, randomBytes)
    const point = p.multiply(r)
    return { point, blind: r }
  }

  unblind(p: Point, blind: bigint): Point {
    const rInv = invert(blind, this.config.curve.CURVE.n)
    return p.multiply(rInv)
  }

  sign(p: Point, secret: bigint): Point {
    return p.multiply(secret)
  }

  createBlind(): BlindToken {
    const seed = randomBytes(this.config.curve.CURVE.nByteLength)
    const point = this.config.hash2Curve(seed)
    return {
      seed,
      ...this.blind(point)
    }
  }
}
