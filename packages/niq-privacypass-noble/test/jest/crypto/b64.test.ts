import { b64db, b64eb } from '../../../src/crypto/b64'

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

  describe('sanity test', () => {
    it('should encode and decode a Uint8Array to base64', () => {
      const bytes = new Uint8Array([0, 1, 2, 3, 4, 5])
      const encoded = b64eb(bytes)
      const decoded = b64db(encoded)
      expect(decoded).toEqual(bytes)
    })
  })
})
