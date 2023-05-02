// src/crypto/blindPoints.ts
import { randomBytes } from '@noble/hashes/utils'
import { invert } from '@noble/curves/abstract/modular'
import { hmac } from '@noble/hashes/hmac'
import { bytesToNumberBE, equalBytes } from '@noble/curves/abstract/utils'

import { BlindToken, H2Config, Point, PrngFn } from './types'
import { randomScalar } from './randomScalar'
import { b64db } from './b64'

export class CryptoContext {
  constructor(public config: H2Config) {
    // bind this so can be used in map() calls
    this.decodePointB64 = this.decodePointB64.bind(this)
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

  decodePointB64(data: string) {
    return this.decodePoint(b64db(data))
  }

  HMAC(key: Point, message: Buffer) {
    const keyBuffer = key.toRawBytes(false)
    return hmac(this.config.hash, keyBuffer, message)
  }

  makeHMAC(key: string | Uint8Array): {
    // TODO: for some reason typescript complains when try to export
    // hmac.create
    // Error: packages/niq-privacypass-noble/src/crypto/context.ts(62,3): error TS4094: Property 'destroyed' of exported class expression may not be private or protected.
    // Error: packages/niq-privacypass-noble/src/crypto/context.ts(62,3): error TS4094: Property 'finished' of exported class expression may not be private or protected.
    update: (bytes: string | Uint8Array) => void
    digest: () => Uint8Array
  } {
    return hmac.create(this.config.hash, key)
  }

  hashUncompressedPoints(...pts: Point[]) {
    const h = this.config.hash.create()
    pts.forEach(pt => h.update(pt.toRawBytes(false)))
    return h.digest()
  }

  hashPointsBigInt(...pts: Point[]) {
    return bytesToNumberBE(this.hashUncompressedPoints(...pts))
  }

  deriveKey(p: Point, token: Uint8Array): Uint8Array {
    const h = this.makeHMAC('hash_derive_key')
    h.update(token)
    h.update(p.toRawBytes(false))
    return h.digest()
  }

  createRequestBinding(key: Uint8Array, data: Uint8Array[]): Uint8Array {
    const h = this.makeHMAC(key)
    h.update('hash_request_binding')
    for (const item of data) {
      h.update(item as Uint8Array)
    }
    return h.digest()
  }

  checkRequestBinding(
    key: Uint8Array,
    supplied: Uint8Array,
    observed: Uint8Array[]
  ): boolean {
    const h = this.makeHMAC(key)
    h.update('hash_request_binding')
    for (const item of observed) {
      h.update(item)
    }
    const expected = h.digest()
    return equalBytes(supplied, expected)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface CryptoContext extends Base64Utils {}
