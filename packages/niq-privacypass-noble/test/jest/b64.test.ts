import { b64db, b64eb, b64dpt } from '../../src/b64'

describe('base64 functions', () => {
  describe('b64db', () => {
    it('should correctly decode a base64-encoded string', () => {
      const encoded = 'SGVsbG8gV29ybGQ='
      const expected = new Uint8Array([
        72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100
      ])
      expect(b64db(encoded)).toEqual(expected)
    })

    it('should correctly decode an empty string', () => {
      const encoded = ''
      const expected = new Uint8Array([])
      expect(b64db(encoded)).toEqual(expected)
    })
  })

  describe('b64eb', () => {
    it('should correctly encode a Uint8Array to base64', () => {
      const bytes = new Uint8Array([
        72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100
      ])
      const expected = 'SGVsbG8gV29ybGQ='
      expect(b64eb(bytes)).toEqual(expected)
    })

    it('should correctly encode an empty Uint8Array', () => {
      const bytes = new Uint8Array([])
      const expected = ''
      expect(b64eb(bytes)).toEqual(expected)
    })
  })

  describe('b64dpt', () => {
    it('should correctly decode a base64-encoded ProjectivePoint', () => {
      const encoded =
        'BEPx6JdJWRcGEeD7D94ggp0h+EearSWl8Xxz9Y0qAG31v1myps23mGJ6XGxQCadyRNVslfP+V2UWYFxph2Dxrqs='
      expect(b64dpt(encoded)).toMatchInlineSnapshot(`
        Point {
          "px": 30732376281519287560868674779110792350007175663169242228025832276419458133493n,
          "py": 86550236476034578350288846928780944922334589109482887485581043623436540292779n,
          "pz": 1n,
        }
      `)
    })

    it('should thrown on an empty base64-encoded ProjectivePoint', () => {
      const encoded = ''
      expect(() => b64dpt(encoded)).toThrow()
    })
  })

  describe('sanity test', () => {
    it('should encode and decode a Uint8Array to base64', () => {
      const bytes = new Uint8Array([0, 1, 2, 3, 4, 5])
      const encoded = b64eb(bytes)
      const decoded = b64db(encoded)
      expect(decoded).toEqual(bytes)
    })
  })
})
