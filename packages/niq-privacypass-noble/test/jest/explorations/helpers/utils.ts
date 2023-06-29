import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
import { hashToPrivateScalar, invert } from '@noble/curves/abstract/modular'
import { p256, hashToCurve } from '@noble/curves/p256'
import { bytesToNumberBE, numberToBytesBE } from '@noble/curves/abstract/utils'

export { bytesToNumberBE, numberToBytesBE } from '@noble/curves/abstract/utils'

import { Point } from '../../../../src/crypto/voprf/types'

export const HMAC = (key: Point, message: Buffer) => {
  const keyBuffer = Buffer.from(key.toRawBytes(false))
  return hmac(sha256, keyBuffer, message)
}

export const divPoint = (point: Point, scalar: bigint) =>
  point.multiply(invert(scalar, p256.CURVE.n))

export const hashUncompressedPoints = (...pts: Point[]) => {
  const h = sha256.create()
  pts.forEach(pt => h.update(Buffer.from(pt.toRawBytes(false))))
  return h.digest()
}
export const hashPointsBigInt = (...pts: Point[]) => {
  return bytesToNumberBE(hashUncompressedPoints(...pts))
}

export const randomSecret = () => bytesToNumberBE(p256.utils.randomPrivateKey())
export const randomNumber = () => randomSecret()

export const computeSecret = (seedString: string) => {
  const shaFirst = sha256(`compute-secret:${seedString}`)
  // Need >= byteLen(order) + 8 (i.e. 40)
  const hash = Buffer.concat([shaFirst, sha256(shaFirst)])
  return hashToPrivateScalar(hash, p256.CURVE.n)
}

export const hashBigIntToCurve = (n: bigint) => {
  return hashToCurve(numberToBytesBE(n, 32)) as Point
}
export const hashBytesToCurve = (bytes: Uint8Array) => {
  return hashToCurve(bytes) as Point
}
