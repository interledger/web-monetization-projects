import { describe, expect, it } from '@jest/globals'

import { IssueResponseInnerSer } from '../../../../src/protocol/types/ser'
import { b64dbn, b64ds } from '../../../../src/crypto/voprf/b64'

const response =
  'eyJzaWdzIjpbIkJBYzdLV0U2RzlmNmZnWU5QajRZTjlVSEsza3NrR1hWeDdvR0dxaVdkMVMwOEQ4eElaTXkyQmJDSXNBRkd5MVpDVG1ZZGk1bG5jTm50Y20ydHhWeWFQMD0iLCJCSFliWFRrZFdnRjgrL3h2RERSdUFscnNjOHFXRXhHQ1BZN2llSmRhUTc3SzduZVlUWFFOOGdia0VJUGtpTlo1Tjl3VjlEVWtKNE5ZaWJoc0tZU0pYNVU9IiwiQkh3UVJTM0c5b2lCdko1VXh3THNzN2hzSk04a0pzME9oM0FQUFBuVEFpUzJYSFNibmwrNjlYd2cyeko1QlI5OXlOc0VHSzV0R2ptS29qcGpHT0x2M0hNPSIsIkJKdi9SZFRkbk9XVmd0bS9LRmg4U0syRW1xdWdMK0NNY2EvcytnU2VTUU1TNDFYWlExY3owVzVHVDFBNUlRZnMrN0hPTStXc1JhOXAyalIwZHhJU09NMD0iLCJCTW1ST1FpZWdJMGU3dzVyRFhPUnprazE3TWxBd2tTN29uQWdlTVhyT2RQN1UvMWQrNWtNVHlRaWdhc2RmbldUZVdrTmZGTU00ZFZZMm1QT29UZlZVVVk9IiwiQkpseDlpTWJ6ZjBxY0NRT3UyRkovZDZlYVNHY1UrbFZYcDFaSVFEUkdTR3pLTHVCbzdCZ0tpOVZ2cnYyNXlGMlkyTnV2VU9VUnNHdnlKVmV2S1FjOUVJPSIsIkJQS1AyeENpTzNlQVVEbHdzWUtncENEa0plSVZqWjIwY2hCUUEzZENFb2N1MXdMeTdzdFM2UnVSQ0ZiNVgwKzFCaTFmVHJ1MVBTclJMNGlBazV6dVRhST0iLCJCQzVrakpxS0Mycnl6Y1hjTmlmWmhEenNKOTlqYjFGRkkvaSthQ0tBYTN0ck1TUGQrcVNzNDBuRGt5WU1pb0NoK2VaR3k4QWNYQXhGdS9sN0oweC96djg9IiwiQk1DMFlkYzNWeDJFcWpWWm13blFadWUzbC81ekVUWEc5MjJIWm8vYW85QnpqU1VIMEp5NE4yRmZkY2hKdXQyWlJCQkVuSUVnNjE5SnhLYUlkL2VuVDRBPSIsIkJIZWF0Q251Z2pvUHlUbkZJOFV5am4wUXNERHdiTVdidDhQZE5HMjBrV1VJVkd0dGJKUW01MUcwMVB4OXhQRnFBTDhXT05PTXBIYnpyNnZWSE0zSVdxOD0iXSwicHJvb2YiOiJZbUYwWTJndGNISnZiMlk5ZXlKUUlqb2laWGxLVTBscWIybGtNalZVVFVoT2NGbHRlREJsVldSWVRWZHNOazU2YTNwa1ZURkdWbGRrVW1GSFpFSk9NRVZ5VEhsMGEySXhSa1pTVjBWMllYbDBjMDFFTUdsTVEwcEVTV3B2YVUxV1JqUk5SVTV5VTBjNVVWcEVVblprUjBZeVV6Sm9SRm94Ykd4WlZGcElVakpLU2xNelFrbFhiRkV3VlZkb2VGVnJlSGxVTVZJd1RrUXdhV1pSUFQwaWZRPT0iLCJ2ZXJzaW9uIjoiMS4wIn0='

const parsedResponse: IssueResponseInnerSer = JSON.parse(b64ds(response))

describe('IssuedTokenResponse', () => {
  it('should parse into an object', () => {
    expect(parsedResponse).toMatchInlineSnapshot(`
      {
        "proof": "YmF0Y2gtcHJvb2Y9eyJQIjoiZXlKU0lqb2lkMjVUTUhOcFlteDBlVWRYTVdsNk56a3pkVTFGVldkUmFHZEJOMEVyTHl0a2IxRkZSV0V2YXl0c01EMGlMQ0pESWpvaU1WRjRNRU5yU0c5UVpEUnZkR0YyUzJoRFoxbGxZVFpIUjJKSlMzQklXbFEwVVdoeFVreHlUMVIwTkQwaWZRPT0ifQ==",
        "sigs": [
          "BAc7KWE6G9f6fgYNPj4YN9UHK3kskGXVx7oGGqiWd1S08D8xIZMy2BbCIsAFGy1ZCTmYdi5lncNntcm2txVyaP0=",
          "BHYbXTkdWgF8+/xvDDRuAlrsc8qWExGCPY7ieJdaQ77K7neYTXQN8gbkEIPkiNZ5N9wV9DUkJ4NYibhsKYSJX5U=",
          "BHwQRS3G9oiBvJ5UxwLss7hsJM8kJs0Oh3APPPnTAiS2XHSbnl+69Xwg2zJ5BR99yNsEGK5tGjmKojpjGOLv3HM=",
          "BJv/RdTdnOWVgtm/KFh8SK2EmqugL+CMca/s+gSeSQMS41XZQ1cz0W5GT1A5IQfs+7HOM+WsRa9p2jR0dxISOM0=",
          "BMmROQiegI0e7w5rDXORzkk17MlAwkS7onAgeMXrOdP7U/1d+5kMTyQigasdfnWTeWkNfFMM4dVY2mPOoTfVUUY=",
          "BJlx9iMbzf0qcCQOu2FJ/d6eaSGcU+lVXp1ZIQDRGSGzKLuBo7BgKi9Vvrv25yF2Y2NuvUOURsGvyJVevKQc9EI=",
          "BPKP2xCiO3eAUDlwsYKgpCDkJeIVjZ20chBQA3dCEocu1wLy7stS6RuRCFb5X0+1Bi1fTru1PSrRL4iAk5zuTaI=",
          "BC5kjJqKC2ryzcXcNifZhDzsJ99jb1FFI/i+aCKAa3trMSPd+qSs40nDkyYMioCh+eZGy8AcXAxFu/l7J0x/zv8=",
          "BMC0Ydc3Vx2EqjVZmwnQZue3l/5zETXG922HZo/ao9BzjSUH0Jy4N2FfdchJut2ZRBBEnIEg619JxKaId/enT4A=",
          "BHeatCnugjoPyTnFI8Uyjn0QsDDwbMWbt8PdNG20kWUIVGttbJQm51G01Px9xPFqAL8WONOMpHbzr6vVHM3IWq8=",
        ],
        "version": "1.0",
      }
    `)
  })
  it('should contain a proof that can be verified', () => {
    const proof = b64ds(parsedResponse.proof)
    // a
    expect(proof).toMatchInlineSnapshot(
      `"batch-proof={"P":"eyJSIjoid25TMHNpYmx0eUdXMWl6NzkzdU1FVWdRaGdBN0ErLytkb1FFRWEvaytsMD0iLCJDIjoiMVF4MENrSG9QZDRvdGF2S2hDZ1llYTZHR2JJS3BIWlQ0UWhxUkxyT1R0ND0ifQ=="}"`
    )
    const encodedObjectString = proof.slice('batch-proof='.length)
    const encodedObject = JSON.parse(encodedObjectString)
    expect(encodedObject).toMatchInlineSnapshot(`
      {
        "P": "eyJSIjoid25TMHNpYmx0eUdXMWl6NzkzdU1FVWdRaGdBN0ErLytkb1FFRWEvaytsMD0iLCJDIjoiMVF4MENrSG9QZDRvdGF2S2hDZ1llYTZHR2JJS3BIWlQ0UWhxUkxyT1R0ND0ifQ==",
      }
    `)
    const innerPString = b64ds(encodedObject.P)
    expect(innerPString).toMatchInlineSnapshot(
      `"{"R":"wnS0sibltyGW1iz793uMEUgQhgA7A+/+doQEEa/k+l0=","C":"1Qx0CkHoPd4otavKhCgYea6GGbIKpHZT4QhqRLrOTt4="}"`
    )
    const innerPObject = JSON.parse(innerPString)
    expect(innerPObject).toMatchInlineSnapshot(`
      {
        "C": "1Qx0CkHoPd4otavKhCgYea6GGbIKpHZT4QhqRLrOTt4=",
        "R": "wnS0sibltyGW1iz793uMEUgQhgA7A+/+doQEEa/k+l0=",
      }
    `)
    expect(b64dbn(innerPObject.C)).toMatchInlineSnapshot(
      `96364639792129613352895115985562250220805308415434436762376437066184050757342n`
    )
    expect(b64dbn(innerPObject.R)).toMatchInlineSnapshot(
      `87954894001977267480768943353722969797833891032242145921662637639569531796061n`
    )
  })
})
