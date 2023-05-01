import { CurveFn, ProjPointType } from '@noble/curves/abstract/weierstrass'
import { CHash } from '@noble/hashes/utils'

export type Point = ProjPointType<bigint>

export interface BlindToken {
  seed: Uint8Array
  point: Point
  blind: bigint
}

export interface H2Config {
  curve: CurveFn
  hash: CHash
  hash2Curve: (bytes: Uint8Array) => Point
  prng: (seed: Uint8Array) => (n: number) => Uint8Array
}
