import { bytesToNumberBE } from '@noble/curves/abstract/utils'
import { p256 } from '@noble/curves/p256'
import { CurveFn } from '@noble/curves/abstract/weierstrass'

export const b64db = (data: string): Uint8Array => {
  const binaryString = atob(data)
  const length = binaryString.length
  const bytes = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}

export const b64eb = (bytes: Uint8Array): string => {
  const length = bytes.length
  const chars: string[] = new Array(length)

  for (let i = 0; i < length; i++) {
    chars[i] = String.fromCharCode(bytes[i])
  }

  const binaryString = chars.join('')
  return btoa(binaryString)
}

export const b64ds = (data: string) => atob(data)
export const b64dj = (data: string) => JSON.parse(b64ds(data))
export const b64dbn = (data: string) => bytesToNumberBE(b64db(data))
export const b64dpt = (data: string, curve: CurveFn = p256) => {
  return curve.ProjectivePoint.fromHex(b64db(data))
}
