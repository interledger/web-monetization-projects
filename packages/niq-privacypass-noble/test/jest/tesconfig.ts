import { p256 } from '@noble/curves/p256'
import { sha256 } from '@noble/hashes/sha256'

import { H2Config, Point } from '../../src/crypto/types'
import { hashAndInc } from '../../src/crypto/hashAndInc'
import { CryptoContext } from '../../src/crypto/context'
import { shakePrng } from '../../src/crypto/shakePrng'

export const h2Config: H2Config = {
  curve: p256,
  hash: sha256,
  prng: shakePrng,
  hash2Curve: (bytes: Uint8Array) => {
    return hashAndInc(bytes) as Point
  }
}
export const cryptoContext = new CryptoContext(h2Config)
