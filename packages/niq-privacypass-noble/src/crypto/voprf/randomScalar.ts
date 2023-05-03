import { CurveFn } from '@noble/curves/abstract/weierstrass'
import { bytesToNumberBE } from '@noble/curves/abstract/utils'

// This is just a bitmask with the number of ones starting at 8 then
// incrementing by index. To account for fields with bit sizes that are not a
// whole number of bytes, we mask off the unnecessary bits.
const MASK = [0xff, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f]

export function randomScalar(
  curveFn: CurveFn,
  rand: (size: number) => Uint8Array
) {
  const curve = curveFn.CURVE
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const buf = rand(curve.nByteLength)
    // Mask to account for field sizes that are not a whole number of bytes.
    buf[0] &= MASK[curve.nBitLength % 8]
    // Check if scalar is in the correct range.
    const candidate = bytesToNumberBE(buf)
    if (candidate >= curve.n) {
      continue
    }
    return { scalar: candidate, buf }
  }
}