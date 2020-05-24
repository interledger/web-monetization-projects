import * as crypto from 'crypto'

import * as sjcl from 'sjcl'
import {
  getActiveECSettings,
  h2Curve,
  initECSettings,
  sec1Encode
} from '@coil/privacypass-sjcl'
import { hashAndInc, randomBN } from '@coil/privacypass-elliptic'

import { CURVE } from '../../src/curve'

initECSettings({
  curve: 'p256',
  hash: 'sha256',
  method: 'increment'
})

describe('hashAndInc generated sanity tests', () => {
  const numTests = 1

  for (let i = 0; i < numTests; i++) {
    it(`should return same point as sjcl for given seed: ix=${i}`, () => {
      const random = crypto.randomBytes(32)
      const sjclBits = sjcl.codec.bytes.toBits([...random])
      const point = h2Curve(sjclBits, getActiveECSettings())
      const point2 = hashAndInc(random)
      expect(point).toBeDefined()
      const pointHex = sjcl.codec.hex.fromBits(
        sjcl.codec.bytes.toBits(sec1Encode(point, true))
      )
      expect(pointHex).toBe(point2.encodeCompressed('hex'))
    })
  }
})

describe('randomBN', () => {
  it('ok', () => {
    const snap = 56
    const target = 7
    const hits: Record<number, number> = {}
    for (let i = 1; i <= snap; i++) {
      const result = i % target || target
      if (typeof hits[result] === 'undefined') {
        hits[result] = 1
      } else {
        hits[result]++
      }
    }
    const derps = new Set(Object.values(hits))
    console.log(derps, hits)
  })

  it('should work without too many iterations', () => {
    console.log(CURVE.order.muln(2).byteLength())
  })

  it('over 1e3 invocations with p256.n as arg will never loop more than once', () => {
    for (let i = 0; i < 1e3; i++) {
      const random = randomBN(CURVE.order)
      // console.log(random.toString())
      if (random.__ix > 1) {
        throw new Error()
      }
    }
  })
})
