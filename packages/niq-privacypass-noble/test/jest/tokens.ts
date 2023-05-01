import { randomBytes } from '@noble/hashes/utils'
import { sha256 } from '@noble/hashes/sha256'
// TODO: report typing issue with hashToCurve
import { hashToCurve } from '@noble/curves/p256'

import { BlindToken, Point } from '../../src/crypto/types'
import { computeSecret, randomSecret } from '../../src/crypto/utils'

function newRandomPoint(seedString?: string): {
  seed: Uint8Array
  point: Point
} {
  const seed = seedString
    ? sha256(`random-point:${seedString}`)
    : randomBytes(32)
  const point = hashToCurve(seed) as Point
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {
    seed,
    point
  }
}

export function blindPoint(
  point: Point,
  seedString?: string
): { point: Point; blind: bigint } {
  const bF = seedString ? computeSecret(seedString) : randomSecret()
  const bP = point.multiply(bF)
  return { point: bP, blind: bF }
}

export function createBlindToken(seedString?: string): BlindToken {
  const randomPoint = newRandomPoint(seedString)
  const blindedPoint = blindPoint(randomPoint.point, seedString)
  return {
    seed: randomPoint.seed,
    point: blindedPoint.point,
    blind: blindedPoint.blind
  }
}

export const randomPoint = () => {
  return newRandomPoint().point
}
