import * as crypto from 'crypto'

import * as elliptic from 'elliptic'
import BN from 'bn.js'

import { hashAndInc } from './hashToCurve'
import { CURVE } from './curve'

type Point = elliptic.curve.base.BasePoint

export interface BlindTokenEl {
  seed: Buffer
  point: Point
  blind: BN
}

export function newRandomPointEl() {
  const seed = crypto.randomBytes(32)
  return { seed, point: hashAndInc(seed) }
}

type RandomBn = BN & { __ix: number }

/**
 * @param modulus - typically order of the curve
 * TODO: optimize, though it's unlikely worth the hassle given probability
 *       of looping is practically low and this avoids any issues with
 *       distributing random bytes between 0 and modulus - 1
 *       fit for purpose
 */
export function randomBN(modulus: BN) {
  const bl = modulus.byteLength()
  let out: BN
  let ix = 0
  do {
    const buffer = crypto.randomBytes(bl)
    out = new BN(buffer)
    ix++
  } while (!out.isZero() && out.gte(modulus))
  const outed = out as RandomBn
  outed.__ix = ix
  return outed
}

export function blindPointEl(point: Point) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const bF = randomBN(CURVE.order)
  const bP = point.mul(bF)
  return { point: bP, blind: bF }
}

export function CreateBlindTokenEl(): BlindTokenEl {
  const randomPoint = newRandomPointEl()
  const blindedPoint = blindPointEl(randomPoint.point)
  return {
    seed: randomPoint.seed,
    point: blindedPoint.point,
    blind: blindedPoint.blind
  }
}
