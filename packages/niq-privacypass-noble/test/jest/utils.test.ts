import { createBlindToken } from '../../src/crypto/tokens'
import { computeSecret, divPoint } from '../../src/crypto/utils'

describe('createBlindToken', () => {
  test('returns a BlindToken object', () => {
    const token = createBlindToken()
    expect(token).toHaveProperty('seed')
    expect(token).toHaveProperty('point')
    expect(token).toHaveProperty('blind')
  })

  test('creates a random point', () => {
    const token = createBlindToken()
    expect(token.seed).toHaveLength(32)
    expect(token.point).toBeDefined()
    expect(token.blind).toBeDefined()
  })

  test('blinds the random point', () => {
    const token = createBlindToken()
    const { point, blind } = token
    const blinded = point.multiply(blind)
    expect(blinded).not.toEqual(point)
  })
})

describe('@noble/curves api', () => {
  it(
    'should be possible to divide a point, by multiplying by inverse, ' +
      'mod order',
    () => {
      const sK = computeSecret('secret')
      const token = createBlindToken('pt1')
      const multiplied = divPoint(token.point, sK)
      expect(multiplied).toMatchInlineSnapshot(`
        Point {
          "px": 51064926883120881294235320831226420557361060473142167445924793718687472147059n,
          "py": 1422413086176492447832268378628887856701328348076955647197331057345743188333n,
          "pz": 1n,
        }
      `)
    }
  )
})
