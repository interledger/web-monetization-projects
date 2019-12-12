import { createHmac, BinaryLike } from 'crypto'

const HASH_FUNC = 'sha256'
const HASH_BYTES = 32

export function longHash(bits: number, data: BinaryLike): Buffer {
  const bytes = Math.ceil(bits / 8)
  const output = Buffer.alloc(bytes)

  for (let nonce = 0; nonce < Math.ceil(bytes / HASH_BYTES); ++nonce) {
    const hashSegment = createHmac(HASH_FUNC, nonce.toString())
      .update(data)
      .digest()
    hashSegment.copy(output, nonce * HASH_BYTES)
  }

  return output
}
