// src/crypto/blindPoints.ts
import { randomBytes } from '@noble/hashes/utils'
import { invert } from '@noble/curves/abstract/modular'
import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'

import { Base64Utils, createB64Utils } from '../b64'

import { BlindToken, H2Config, Point } from './types'
import { randScalar } from './randScalar'

export class CryptoContext {
  constructor(public config: H2Config) {
    Object.assign(this, createB64Utils(this.config.curve))
  }

  blindPoint(p: Point): { point: Point; blind: bigint } {
    const { scalar: r } = randScalar(this.config.curve, randomBytes)
    const point = p.multiply(r)
    return { point, blind: r }
  }

  unblindPoint(p: Point, blind: bigint): Point {
    const rInv = invert(blind, this.config.curve.CURVE.n)
    return p.multiply(rInv)
  }

  signPoint(p: Point, secret: bigint): Point {
    return p.multiply(secret)
  }

  createBlind(): BlindToken {
    const seed = randomBytes(this.config.curve.CURVE.nByteLength)
    const point = this.config.hash2Curve(seed)
    return {
      seed,
      ...this.blindPoint(point)
    }
  }

  HMAC(key: Point, message: Buffer) {
    const keyBuffer = Buffer.from(key.toRawBytes(false))
    return hmac(this.config.hash, keyBuffer, message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CryptoContext extends Base64Utils {}
