import { CurveFn } from '@noble/curves/abstract/weierstrass'
import { bitLen as bitLength } from '@noble/curves/abstract/utils'
import { bytesToHex } from '@noble/hashes/utils'

// This is just a bitmask with the number of ones starting at 8 then
// incrementing by index. To account for fields with bitsizes that are not a whole
// number of bytes, we mask off the unnecessary bits. h/t agl
const mask = [0xff, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f]

export function randScalar(
  curve: CurveFn,
  rand: (size: number) => Uint8Array
): bigint {
  const N = curve.CURVE.n // base point subgroup order
  const bitLen = bitLength(N)
  const byteLen = (bitLen + 7) >> 3
  const buf = new Uint8Array(byteLen)

  // Mask to account for field sizes that are not a whole number of bytes.
  buf[0] &= mask[bitLen % 8]

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const randBytes = rand(byteLen)
    buf.set(randBytes)
    // Mask to account for field sizes that are not a whole number of bytes.
    buf[0] &= mask[bitLen % 8]
    // Check if scalar is in the correct range.
    const candidate = BigInt(`0x${bytesToHex(buf)}`)
    if (candidate >= N) {
      continue
    }
    return candidate
  }
}
