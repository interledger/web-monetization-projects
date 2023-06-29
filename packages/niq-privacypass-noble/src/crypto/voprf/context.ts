import { randomBytes } from '@noble/hashes/utils'
import { invert } from '@noble/curves/abstract/modular'
import { hmac } from '@noble/hashes/hmac'
import { bytesToNumberBE, equalBytes } from '@noble/curves/abstract/utils'

import { b64db } from './b64'
import { BlindedToken, H2Config, Hashable, Point, PrngFn } from './types'
import { randomScalar } from './randomScalar'

export class CryptoContext {
  constructor(public config: H2Config) {
    // bind this so can be used in map() calls
    this.b64dpt = this.b64dpt.bind(this)
  }

  blindPoint(p: Point): { blindedPoint: Point; blind: bigint } {
    const { scalar: blind } = randomScalar(this.config.curve, randomBytes)
    const blindedPoint = p.multiply(blind)
    return { blindedPoint, blind }
  }

  unblindPoint(p: Point, blind: bigint): Point {
    const rInv = invert(blind, this.config.curve.CURVE.n)
    return p.multiply(rInv)
  }

  signPoint(p: Point, secret: bigint): Point {
    return p.multiply(secret)
  }

  createBlind(): BlindedToken {
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

  b64dpt(data: string) {
    return this.decodePoint(b64db(data))
  }

  makeHMAC(key: Hashable): {
    // TODO: for some reason typescript complains when try to export
    // hmac.create
    // Error: packages/niq-privacypass-noble/src/crypto/context.ts(62,3): error TS4094: Property 'destroyed' of exported class expression may not be private or protected.
    // Error: packages/niq-privacypass-noble/src/crypto/context.ts(62,3): error TS4094: Property 'finished' of exported class expression may not be private or protected.
    update: (bytes: Hashable) => void
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

  createRequestBinding(key: Uint8Array, data: Hashable[]): Uint8Array {
    const h = this.makeHMAC(key)
    h.update('hash_request_binding')
    for (const item of data) {
      h.update(item)
    }
    return h.digest()
  }

  checkRequestBinding(
    mac: Uint8Array,
    key: Uint8Array,
    data: Hashable[]
  ): boolean {
    const expected = this.createRequestBinding(key, data)
    return equalBytes(mac, expected)
  }
}
