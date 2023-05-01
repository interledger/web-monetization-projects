import { p256 } from '@noble/curves/p256'

import { H2Config, Point } from './types'
import { randScalar } from './randScalar'

export function computeComposites(
  g: Point,
  y: Point,
  p: Point[],
  q: Point[],
  config: H2Config
) {
  if (p.length !== q.length) {
    throw new Error('Unequal point counts')
  }

  // seed = H(G, Y, [P], [Q])
  const hash = config.hash.create()
  // All the points must match the go server implementation which hashes the
  // points in uncompressed form
  hash.update(g.toRawBytes(false))
  hash.update(y.toRawBytes(false))
  for (let i = 0; i < p.length; i++) {
    hash.update(p[i].toRawBytes(false))
    hash.update(q[i].toRawBytes(false))
  }

  const seed = hash.digest()
  const rand = config.prng(seed)

  return p.reduce(
    (acc, pt, i) => {
      const { scalar: ci, buf } = randScalar(config.curve, rand)

      const cM = pt.multiply(ci)
      const cZ = q[i].multiply(ci)

      // Accumulate the results
      acc.m = acc.m.add(cM)
      acc.z = acc.z.add(cZ)
      acc.c.push(buf)

      return acc
    },
    {
      m: p256.ProjectivePoint.ZERO,
      z: p256.ProjectivePoint.ZERO,
      c: [] as Uint8Array[]
    }
  )
}
