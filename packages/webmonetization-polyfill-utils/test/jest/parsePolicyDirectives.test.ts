import { describe, expect, it } from '@jest/globals'

import { parsePolicyDirectives } from '../../src/lib/parsePolicyDirectives'

describe('parsePolicyDirectives', () => {
  it('should return an object with array values', () => {
    const allow =
      'vibrate https://a.com https://b.com;' +
      " fullscreen 'none';" +
      " payment 'src';" +
      ' payment;' +
      " usb '*'"
    const actual = parsePolicyDirectives(allow)
    expect(actual).toStrictEqual({
      vibrate: ['https://a.com', 'https://b.com'],
      fullscreen: ["'none'"],
      payment: ["'src'"],
      usb: ["'*'"]
    })
  })
})
