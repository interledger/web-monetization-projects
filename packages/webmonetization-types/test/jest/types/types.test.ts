import { describe, expect, it } from '@jest/globals'

describe('Web-Monetization', () => {
  describe('Deprecated fields scribbles', () => {
    // Note that this may not work due to requirements for type serialization
    it('should be possible to hide deprecated fields and warn upon use', () => {
      let warned = false
      const prototype = { nothing: true }
      const object = Object.create(prototype, {
        requestId: {
          enumerable: false,
          get(): string {
            warned = true
            return this.id
          }
        }
      })
      object.id = 'owen'
      expect(object.requestId).toEqual('owen')
      expect(JSON.stringify({ object })).toEqual('{"object":{"id":"owen"}}')
      expect(warned).toBe(true)
    })
  })
})

// eslint-disable-next-line jest/no-export
export {}
