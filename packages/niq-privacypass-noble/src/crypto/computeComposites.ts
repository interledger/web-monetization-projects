import { Point } from './types'
import { CryptoContext } from './context'

export function computeComposites(
  // point
  g: Point,
  // signed point
  y: Point,
  // points
  p: Point[],
  // signed points
  q: Point[],
  context: CryptoContext
) {
  if (p.length !== q.length) {
    throw new Error('Unequal point counts')
  }

  // seed = H(G, Y, [P], [Q])
  const hash = context.config.hash.create()
  // All the points must match the go server implementation which hashes the
  // points in uncompressed form
  hash.update(g.toRawBytes(false))
  hash.update(y.toRawBytes(false))
  for (let i = 0; i < p.length; i++) {
    hash.update(p[i].toRawBytes(false))
    hash.update(q[i].toRawBytes(false))
  }

  const seed = hash.digest()
  const rand = context.config.prng(seed)

  const Zero = context.config.curve.ProjectivePoint.ZERO

  return p.reduce(
    (acc, pt, i) => {
      const { scalar: ci, buf } = context.randomScalarWithBuf(rand)

      const cM = pt.multiply(ci)
      const cZ = q[i].multiply(ci)

      // Accumulate the results
      acc.m = acc.m.add(cM)
      acc.z = acc.z.add(cZ)
      acc.c.push(buf)

      return acc
    },
    {
      m: Zero,
      z: Zero,
      c: [] as Uint8Array[]
    }
  )
}
