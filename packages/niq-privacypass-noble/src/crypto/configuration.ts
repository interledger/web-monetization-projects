import { p256 } from '@noble/curves/p256'
import { sha256 } from '@noble/hashes/sha256'

import { H2Config, Point } from './types'
import { shakePrng } from './shakePrng'
import { hashAndInc } from './hashAndInc'

export const defaultConfig: H2Config = {
  curve: p256,
  hash: sha256,
  prng: shakePrng,
  hash2Curve: (bytes: Uint8Array) => {
    return hashAndInc(bytes) as Point
  }
}
