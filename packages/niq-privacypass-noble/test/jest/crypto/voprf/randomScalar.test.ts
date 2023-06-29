import { describe, expect, it } from '@jest/globals'
import { Keccak, shake256 } from '@noble/hashes/sha3'
import { p256 } from '@noble/curves/p256'
import { hexToBytes } from '@noble/hashes/utils'

import { randomScalar } from '../../../../src/crypto/voprf/randomScalar'

describe('randScalar', () => {
  const seed =
    '2f0aa262e5c7c031e39c0f93b23bbf85f932bd952c2413dd56167a7f024ee311'
  const shake = shake256.create({}) as Keccak
  shake.update(hexToBytes(seed))
  const rand = shake.xof.bind(shake)

  it('should create a known scalar from known seed', () => {
    const { scalar } = randomScalar(p256, rand)
    expect(scalar.toString(16)).toBe(
      '8ecf5995472674173240025879f8816917a8be5f6991403431cb5c2ac73f1306'
    )
  })
  it('should create 2nd known scalar from known seed', () => {
    const { scalar } = randomScalar(p256, rand)
    expect(scalar.toString(16)).toBe(
      'aa72904c2e91e4c51e37149671ddba8da14cc891af3f069bf2efa8a543791afd'
    )
  })
  it('should create 3rd known scalar from known seed', () => {
    const { scalar } = randomScalar(p256, rand)
    expect(scalar.toString(16)).toBe(
      '8bdca2f2c09f32f51eb6810d22daf15a66c708839d3c5540605a2e31777e6c79'
    )
  })
})
