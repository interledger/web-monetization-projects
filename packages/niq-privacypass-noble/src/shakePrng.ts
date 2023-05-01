import { Keccak, shake256 } from '@noble/hashes/sha3'

export function shakePrng(seed: Uint8Array) {
  const prng = shake256.create({}) as Keccak
  prng.update(seed)
  return prng.xof.bind(prng)
}
