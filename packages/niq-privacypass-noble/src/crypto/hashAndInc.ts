import { CHash, concatBytes } from '@noble/hashes/utils'
import { CurveFn, ProjPointType } from '@noble/curves/abstract/weierstrass'
import { p256 } from '@noble/curves/p256'
import { sha256 } from '@noble/hashes/sha256'

import { Hashable } from './types'

const LABEL = '1.2.840.10045.3.1.7 point generation seed'
const YBYTE = new Uint8Array([0x02])

export function hashAndInc(
  seed: Uint8Array,
  HashClass: CHash = sha256,
  // We can't use CryptoContext or Config here
  curve: CurveFn = p256,
  label: Hashable = LABEL
): ProjPointType<bigint> {
  let h = HashClass.create()
  h.update(label)

  let i = 0
  for (i = 0; i < 20; i++) {
    const ctr = new Uint8Array(4)
    ctr[0] = (i >>> 0) & 0xff

    h.update(seed)
    h.update(ctr)

    const digestBytes = h.digest()
    const potentialPoint = concatBytes(YBYTE, digestBytes)
    try {
      return curve.ProjectivePoint.fromHex(potentialPoint)
    } catch (e) {
      seed = digestBytes
      h = HashClass.create()
    }
  }

  throw new Error('Unable to construct point using hash and increment')
}
