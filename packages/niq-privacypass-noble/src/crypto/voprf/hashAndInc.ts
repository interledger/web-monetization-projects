import { CHash, concatBytes } from '@noble/hashes/utils'
import { CurveFn } from '@noble/curves/abstract/weierstrass'
import { p256 } from '@noble/curves/p256'
import { sha256 } from '@noble/hashes/sha256'
import { numberToBytesLE } from '@noble/curves/abstract/utils'

import { Hashable, Point } from './types'

const LABEL = '1.2.840.10045.3.1.7 point generation seed'
const YBYTE = new Uint8Array([0x02])
const MAX_ITER = 20n

export function hashAndInc(
  seed: Uint8Array,
  hash: CHash = sha256,
  // We can't use CryptoContext or Config here
  curve: CurveFn = p256,
  label: Hashable = LABEL
): Point {
  let h = hash.create()
  h.update(label)

  for (let i = 0n; i < MAX_ITER; i++) {
    const ctr = numberToBytesLE(i, 4)

    h.update(seed)
    h.update(ctr)

    const xBytes = h.digest()
    const potentialPoint = concatBytes(YBYTE, xBytes)
    try {
      return curve.ProjectivePoint.fromHex(potentialPoint)
    } catch (e: unknown) {
      seed = xBytes
      h = hash.create()
    }
  }

  throw new Error('Unable to construct point using hash and increment')
}
