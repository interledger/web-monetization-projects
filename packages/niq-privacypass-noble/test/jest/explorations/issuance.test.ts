import { p256 } from '@noble/curves/p256'

const REQUEST = {
  type: 'Issue',
  contents: [
    // Each of these is an ECC point in uncompressed form 0x4 prefixed
    'BH43F1YTebF3mfTfnWDRY2JsdcHurZbzrg6/cgU2jai/jKEMBVGFJUylRCFFsujMd28ZkPhW4OfRiAZTRGfxKq4=',
    'BAw2w3RfPO4kUrASO5pF1G2GkxoFjtXTTVcdhBSZzQUQCR2iWrUDbybDYSkzbIg0z/BkflWY3BsiGWy33vCN318=',
    'BM7YPYgDmm4D4WuNoHEN8y7rrqBj8kAu1EeRH62yx/DJoyQBZaUOV5MxWFjhgkYjcP1B0zQOy3cjf8UTZ6WKOF0=',
    'BJy0KeJBNkGATwt5tPo7vgnpXGZye90yySkZiF8nqYYFqfwykwDkvKnhtY5iHNQdKL8PQoOr286edmD+OAfhRCc=',
    'BI7KzJXMyuJuK5TMfDa4/+nxQvFamAyZWtvQaDammGsIzILKJednWYfrF9SuloQlnKw89JBnngqdYd82iZdIsm0=',
    'BLHh0ixNF1Vz4j8BQExSSxAhmDNyFrqqCZEQjuRY+m81dcR0lnKcrzDGIcqdAqQ6qdbnD/9GtuVZ9nwVlFrDLeI=',
    'BF3c6z4sZwtIrIgRr92+EIMMeom+SLo5MUxlYVB4KhBqkKOlfFxMQJc7AB8oTsyTTQj4k/c3Chf4CEebWFgwE8o=',
    'BHuTfNBqC3VK+epWhIb0HBBFC64kdNsGaop7HsXfElTNIiHsVj9b9G3h1SMZ8znkmJLJZ8iQwODmsHigVTyiCqA=',
    'BE6nLPRkeIqp8mJUn9BnsTa/8SN20cupCF6a9943EPjuKjWQPk2mXpNqVBX87fY2uF2tkBD7gyJSsU+Ek9kL+d4=',
    'BDu55O6jh3A5+a/mdvcbkGv9DbXYgvOdUrRBMxs3W2GDkVKkjkwfyUvoxjBk3DS6RYHpqFwK0dOda+aIpVhp/cg='
  ]
}

describe('Issue Request', () => {
  it('should have points in the contents', () => {
    for (let ix = 0; ix < REQUEST.contents.length; ix++) {
      const rawBytes = new Uint8Array(
        Buffer.from(REQUEST.contents[ix], 'base64')
      )
      const point = p256.ProjectivePoint.fromHex(rawBytes)
      expect(point.toRawBytes(false)).toEqual(rawBytes)
    }
  })
})
