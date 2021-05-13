import assert from 'assert'

import { CoilTokenUtils, DecodedToken, decodeToken } from '@coil/client'

import { testToken } from '../fixtures/testToken'

/**
 * Use JSON.{stringify,parse} instead of actually creating jwts
 */
class TestTokenUtils extends CoilTokenUtils {
  public encode(token: DecodedToken): string {
    return JSON.stringify(token)
  }

  public decode(token: string): DecodedToken {
    return JSON.parse(token)
  }
}

describe('CoilTokenUtils', () => {
  describe('decodeToken', () => {
    it('should decode a token', () => {
      const decoded = decodeToken(testToken)
      expect(decoded).toMatchInlineSnapshot(`
      Object {
        "exp": 1567039068,
        "iat": 1564619868,
        "userId": "cjyf1on2b8bs40706kfgy5wq2",
      }
    `)
    })
  })

  describe('CoilTokenUtils#isExpired', () => {
    const utils = new TestTokenUtils()
    const tokenA = utils.encode({ exp: 50, iat: 20, userId: 'custA' })
    const tokenB = utils.encode({ exp: 60 * 60 * 3, iat: 20, userId: 'custA' })

    const tests: Array<[[string, number, number], boolean]> = [
      [[tokenA, 0, 41], false],
      [[tokenA, 0, 50], true],
      [[tokenA, 0, 51], true],
      [[tokenB, 1, 60 * 60], false],
      [[tokenB, 2, 60 * 60], true]
    ]

    tests.forEach(([args, result]) => {
      const [token, withinHrs, nowSeconds] = args
      it(`isExpired(${args}) === ${result}`, function () {
        expect(utils.isExpired({ token, withinHrs, nowSeconds })).toBe(result)
      })
    })
  })

  describe('CoilTokenUtils#newestToken', () => {
    const utils = new TestTokenUtils()
    const extensionToken: DecodedToken = { exp: 10, userId: 'custA', iat: 1 }
    const siteToken: DecodedToken = { exp: 15, userId: 'custA', iat: 1 }
    const extension = utils.encode(extensionToken)
    const site = utils.encode(siteToken)

    it('should pick the token with the greatest expiry when iat1 == iat2', () => {
      const nowSeconds = 5
      const newest = utils.newestToken({ extension, site }, nowSeconds)
      assert(newest.token != null)
      const parse: DecodedToken = utils.decode(newest.token)
      expect(parse.exp).toBe(15)
      expect(newest.which).toBe('site')
    })

    it('should pick the token with the greatest expiry', () => {
      const extensionToken: DecodedToken = { exp: 16, userId: 'custA', iat: 1 }
      const siteToken: DecodedToken = { exp: 15, userId: 'custA', iat: 10 }
      const extension = utils.encode(extensionToken)
      const site = utils.encode(siteToken)

      const nowSeconds = 5
      const newest = utils.newestToken({ extension, site }, nowSeconds)
      assert(newest.token != null)
      const parse: DecodedToken = utils.decode(newest.token)
      expect(parse.exp).toBe(16)
      expect(newest.which).toBe('extension')
    })

    it('should pick a non null token', () => {
      const nowSeconds = 5
      const newest = utils.newestToken({ extension: null, site }, nowSeconds)
      expect(newest.which).toBe('site')
      expect(newest.token != null).toBe(true)
    })

    it('should return which:null for two null tokens', () => {
      const newest = utils.newestToken({ extension: null, site: null })
      expect(newest.which).toBeNull()
      expect(newest.token).toBeNull()
    })

    it('should return no token if they are both expired', () => {
      const nowSeconds = 30
      const newest = utils.newestToken({ extension, site }, nowSeconds)
      expect(newest.token).toBeNull()
      expect(newest.which).toBeNull()
    })
    it('should filter out expired tokens', () => {
      const nowSeconds = 12
      const newest = utils.newestToken({ extension, site }, nowSeconds)
      expect(newest.token != null).toBe(true)
      expect(newest.which).toBe('site')
    })
  })
})
