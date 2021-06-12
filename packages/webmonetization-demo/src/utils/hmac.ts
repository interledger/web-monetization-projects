import { createHmac } from 'crypto'

const HASH_ALGORITHM = 'sha256'

export function hmac(key: Buffer, message: Buffer): Buffer {
  const h = createHmac(HASH_ALGORITHM, key)
  h.update(message)
  return h.digest()
}
