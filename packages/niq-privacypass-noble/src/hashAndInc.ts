import { CHash, concatBytes } from '@noble/hashes/utils'
import { ProjPointType, CurveFn } from '@noble/curves/abstract/weierstrass'
import { p256 } from '@noble/curves/p256'
import { sha256 } from '@noble/hashes/sha256'

// 1.2.840.10045.3.1.7 point generation seed
const INC_H2C_LABEL = new Uint8Array([
  0x31, 0x2e, 0x32, 0x2e, 0x38, 0x34, 0x30, 0x2e, 0x31, 0x30, 0x30, 0x34, 0x35,
  0x2e, 0x33, 0x2e, 0x31, 0x2e, 0x37, 0x20, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x20,
  0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x73, 0x65,
  0x65, 0x64
])

const YBYTE = new Uint8Array([0x02])

export function hashAndInc(
  seed: Uint8Array,
  HashClass: CHash = sha256,
  label: Uint8Array = INC_H2C_LABEL,
  curve: CurveFn = p256
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
