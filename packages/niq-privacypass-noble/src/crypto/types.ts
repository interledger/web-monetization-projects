import { ProjPointType } from '@noble/curves/abstract/weierstrass'

export type Point = ProjPointType<bigint>

export interface BlindToken {
  seed: Uint8Array
  point: Point
  blind: bigint
}
