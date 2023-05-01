// src/crypto/blindPoints.ts
import { randomBytes } from '@noble/hashes/utils'
import { invert } from '@noble/curves/abstract/modular'
import { hmac } from '@noble/hashes/hmac'
import { bytesToNumberBE } from '@noble/curves/abstract/utils'

import { Base64Utils, createB64Utils } from './b64'
import { BlindToken, H2Config, Point, PrngFn } from './types'
import { randomScalar } from './randomScalar'

export class CryptoContext {
  constructor(public config: H2Config) {
    Object.assign(this, createB64Utils(this.config.curve))
  }

  blindPoint(p: Point): { point: Point; blind: bigint } {
    const { scalar: r } = randomScalar(this.config.curve, randomBytes)
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
    const { seed, point } = this.randomPoint()
    return {
      seed,
      ...this.blindPoint(point)
    }
  }

  randomPoint() {
    const seed = randomBytes(this.config.curve.CURVE.nByteLength)
    const point = this.config.hash2Curve(seed)
    return { seed, point }
  }

  randomScalar(rand: PrngFn = randomBytes) {
    return randomScalar(this.config.curve, rand).scalar
  }

  randomScalarWithBuf(rand: PrngFn = randomBytes) {
    return randomScalar(this.config.curve, rand)
  }

  decodePoint(data: string | Uint8Array) {
    return this.config.curve.ProjectivePoint.fromHex(data)
  }

  HMAC(key: Point, message: Buffer) {
    const keyBuffer = key.toRawBytes(false)
    return hmac(this.config.hash, keyBuffer, message)
  }

  hashUncompressedPoints(...pts: Point[]) {
    const h = this.config.hash.create()
    pts.forEach(pt => h.update(pt.toRawBytes(false)))
    return h.digest()
  }

  hashPointsBigInt(...pts: Point[]) {
    return bytesToNumberBE(this.hashUncompressedPoints(...pts))
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CryptoContext extends Base64Utils {}
