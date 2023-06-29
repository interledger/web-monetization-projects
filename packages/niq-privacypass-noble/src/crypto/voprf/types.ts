import { CurveFn, ProjPointType } from '@noble/curves/abstract/weierstrass'
import { CHash, Input } from '@noble/hashes/utils'

export type Point = ProjPointType<bigint>
export type Hashable = Input

export interface BlindedToken {
  seed: Uint8Array
  // T=H2C(seed) we don't use it
  // point: Point
  blind: bigint
  // (T=H2C(seed)) * blind
  blindedPoint: Point
}

export interface SignedToken extends BlindedToken {
  // (T=H2C(seed)) * blind * serverSecret
  signedPoint: Point
}

export type Hash2CurveFn = (bytes: Uint8Array) => Point
export type PrngFn = (n: number) => Uint8Array
export type PrngFactory = (seed: Uint8Array) => PrngFn

export interface H2Config {
  curve: CurveFn
  hash: CHash
  hash2Curve: Hash2CurveFn
  prng: PrngFactory
}

export interface Commitment {
  g: Point
  // g * sK
  h: Point
}
