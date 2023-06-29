import { bytesToNumberBE } from '@noble/curves/abstract/utils'
import { hexToBytes } from '@noble/hashes/utils'

import type { Point } from './types'

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
export const b64ept = (point: Point) => b64eb(point.toRawBytes(false))
export const b64ej = (data: object) => btoa(JSON.stringify(data))

export const b64ebn = (data: bigint) => {
  let hexData = data.toString(16)
  if (hexData.length % 2 !== 0) {
    hexData = '0' + hexData
  }

  const paddedBytes = hexToBytes(hexData)
  return b64eb(paddedBytes)
}

export const b64ds = (data: string) => atob(data)
export const b64es = (data: string) => btoa(data)
export const b64dj = (data: string) => JSON.parse(b64ds(data))
export const b64dbn = (data: string) => bytesToNumberBE(b64db(data))
