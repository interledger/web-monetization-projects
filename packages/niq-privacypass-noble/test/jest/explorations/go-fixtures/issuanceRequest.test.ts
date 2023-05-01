import { b64dj, b64dpt, b64ds } from '../../../../src/b64'
import { BlindTokenRequest } from '../../../../src/protocol/types'

const BL_SIG_REQ = {
  bl_sig_req:
    'eyJ0eXBlIjoiSXNzdWUiLCJjb250ZW50cyI6WyJCRVB4NkpkSldSY0dFZUQ3RDk0Z2dwMGgrRWVhclNXbDhYeHo5WTBxQUczMXYxbXlwczIzbUdKNlhHeFFDYWR5Uk5Wc2xmUCtWMlVXWUZ4cGgyRHhycXM9IiwiQkJOOXJBemZEYi9yVXI2d0NNTE1FMncxOHplUVZxTVY2a0owUHVJN1dZTzlBUFk2N2ozaTRGdm5rZzVzN0E3dVNlOWJGaDRCWHAvTG93eTRYdGdVREtNPSIsIkJKRVNMS09zMHlJYlIvWFU5ZExOY2FZanFpZjVxVndtZ2hoNjZ1NGtML25tN3U5eDRDNG11M3NHWTdCaWNxNTd1VmxSOUtldTdrbm9CVlh5R1BnQkcrWT0iLCJCRmNIVjhxTTJTT1l6L1RnV3V5Zm9mMTJqK0NkM3M4RXJNOFNRR1p1SlZiRUlKZlF4SHZIY0Fua1p4M3MyUWFDeWQycjh4M1E1bklkWEtZYUloWERHMjA9IiwiQkxVYlhiTFhDQXhYYkRudm4vT2s1Q09MYVBNSXhSU0UrMzU3Y3dEMWtaS2c5V0N4Z3ZiaXBwazRIZWFTQVRVMk5qWkREY0E1aDg0SzhhVmFDS2NZRm13PSIsIkJEYXZGYTExN3RqeVdDS1hxcEo3WFJjQ1pmbTVIeUFqZm9ScXBXRlNFd2tIWHhmVEZZT3EzcmRRaXFOalRLVmVUb2RPSjZvdGFhTlBETUx6blhpUWlLQT0iLCJCUCs4SFR3L2tZZVEzaERKenpSUE1zQ3V6aEVoQkpJS1V1OG5mWXA5M1Y5WVEvdFBNK2VRZHlFMDY3cjhITVNTZlprcS9TcWd4QjNDdDFyS2dydUs5VGc9IiwiQkUrQ3BKTXdFSWVxK0tseDg3Rm1obUt1NzFhQnhPLy8rN3p4QXRkNTZ5L1hrWnUvY0lScHEwdDRkVHBLMmljN2xlVnZZTDVpQXdpZzJ0YnhMRUovM05jPSIsIkJKbjZTZVl4bmsycmJ5WGlGTitTa2piaGxpVVZucU5PMWc2MGIyaGc5YXRGR2RWbStObmoyZk5XZkl2Z1A4cmhQUWpHTDBJbUJSVFczYzUrNjBzejEwWT0iLCJCREprbmRFOWNzSzNmL2ZZL2xKVkpMK1U0Z2JEeWl0aUFSZUJySUVYb0V2ZlVxNERTVjhrcWpLeUI2NGp1YVNSTDAzVkJ0OENza1ZDQlpSaG9Ld3JXZUk9Il19'
}

describe('bl_sig_req', () => {
  it('should contain a base64 encoded json object', () => {
    const jsonString = b64ds(BL_SIG_REQ.bl_sig_req)
    expect(jsonString).toMatchInlineSnapshot(
      `"{"type":"Issue","contents":["BEPx6JdJWRcGEeD7D94ggp0h+EearSWl8Xxz9Y0qAG31v1myps23mGJ6XGxQCadyRNVslfP+V2UWYFxph2Dxrqs=","BBN9rAzfDb/rUr6wCMLME2w18zeQVqMV6kJ0PuI7WYO9APY67j3i4Fvnkg5s7A7uSe9bFh4BXp/Lowy4XtgUDKM=","BJESLKOs0yIbR/XU9dLNcaYjqif5qVwmghh66u4kL/nm7u9x4C4mu3sGY7Bicq57uVlR9Keu7knoBVXyGPgBG+Y=","BFcHV8qM2SOYz/TgWuyfof12j+Cd3s8ErM8SQGZuJVbEIJfQxHvHcAnkZx3s2QaCyd2r8x3Q5nIdXKYaIhXDG20=","BLUbXbLXCAxXbDnvn/Ok5COLaPMIxRSE+357cwD1kZKg9WCxgvbippk4HeaSATU2NjZDDcA5h84K8aVaCKcYFmw=","BDavFa117tjyWCKXqpJ7XRcCZfm5HyAjfoRqpWFSEwkHXxfTFYOq3rdQiqNjTKVeTodOJ6otaaNPDMLznXiQiKA=","BP+8HTw/kYeQ3hDJzzRPMsCuzhEhBJIKUu8nfYp93V9YQ/tPM+eQdyE067r8HMSSfZkq/SqgxB3Ct1rKgruK9Tg=","BE+CpJMwEIeq+Klx87FmhmKu71aBxO//+7zxAtd56y/XkZu/cIRpq0t4dTpK2ic7leVvYL5iAwig2tbxLEJ/3Nc=","BJn6SeYxnk2rbyXiFN+SkjbhliUVnqNO1g60b2hg9atFGdVm+Nnj2fNWfIvgP8rhPQjGL0ImBRTW3c5+60sz10Y=","BDJkndE9csK3f/fY/lJVJL+U4gbDyitiAReBrIEXoEvfUq4DSV8kqjKyB64juaSRL03VBt8CskVCBZRhoKwrWeI="]}"`
    )
    const actual: BlindTokenRequest = JSON.parse(jsonString)
    expect(actual).toMatchInlineSnapshot(`
      {
        "contents": [
          "BEPx6JdJWRcGEeD7D94ggp0h+EearSWl8Xxz9Y0qAG31v1myps23mGJ6XGxQCadyRNVslfP+V2UWYFxph2Dxrqs=",
          "BBN9rAzfDb/rUr6wCMLME2w18zeQVqMV6kJ0PuI7WYO9APY67j3i4Fvnkg5s7A7uSe9bFh4BXp/Lowy4XtgUDKM=",
          "BJESLKOs0yIbR/XU9dLNcaYjqif5qVwmghh66u4kL/nm7u9x4C4mu3sGY7Bicq57uVlR9Keu7knoBVXyGPgBG+Y=",
          "BFcHV8qM2SOYz/TgWuyfof12j+Cd3s8ErM8SQGZuJVbEIJfQxHvHcAnkZx3s2QaCyd2r8x3Q5nIdXKYaIhXDG20=",
          "BLUbXbLXCAxXbDnvn/Ok5COLaPMIxRSE+357cwD1kZKg9WCxgvbippk4HeaSATU2NjZDDcA5h84K8aVaCKcYFmw=",
          "BDavFa117tjyWCKXqpJ7XRcCZfm5HyAjfoRqpWFSEwkHXxfTFYOq3rdQiqNjTKVeTodOJ6otaaNPDMLznXiQiKA=",
          "BP+8HTw/kYeQ3hDJzzRPMsCuzhEhBJIKUu8nfYp93V9YQ/tPM+eQdyE067r8HMSSfZkq/SqgxB3Ct1rKgruK9Tg=",
          "BE+CpJMwEIeq+Klx87FmhmKu71aBxO//+7zxAtd56y/XkZu/cIRpq0t4dTpK2ic7leVvYL5iAwig2tbxLEJ/3Nc=",
          "BJn6SeYxnk2rbyXiFN+SkjbhliUVnqNO1g60b2hg9atFGdVm+Nnj2fNWfIvgP8rhPQjGL0ImBRTW3c5+60sz10Y=",
          "BDJkndE9csK3f/fY/lJVJL+U4gbDyitiAReBrIEXoEvfUq4DSV8kqjKyB64juaSRL03VBt8CskVCBZRhoKwrWeI=",
        ],
        "type": "Issue",
      }
    `)
    expect(actual.contents.map(v => b64dpt(v)).shift()).toMatchInlineSnapshot(`
      Point {
        "px": 30732376281519287560868674779110792350007175663169242228025832276419458133493n,
        "py": 86550236476034578350288846928780944922334589109482887485581043623436540292779n,
        "pz": 1n,
      }
    `)

    expect(b64dj(BL_SIG_REQ.bl_sig_req)).toMatchInlineSnapshot(`
      {
        "contents": [
          "BEPx6JdJWRcGEeD7D94ggp0h+EearSWl8Xxz9Y0qAG31v1myps23mGJ6XGxQCadyRNVslfP+V2UWYFxph2Dxrqs=",
          "BBN9rAzfDb/rUr6wCMLME2w18zeQVqMV6kJ0PuI7WYO9APY67j3i4Fvnkg5s7A7uSe9bFh4BXp/Lowy4XtgUDKM=",
          "BJESLKOs0yIbR/XU9dLNcaYjqif5qVwmghh66u4kL/nm7u9x4C4mu3sGY7Bicq57uVlR9Keu7knoBVXyGPgBG+Y=",
          "BFcHV8qM2SOYz/TgWuyfof12j+Cd3s8ErM8SQGZuJVbEIJfQxHvHcAnkZx3s2QaCyd2r8x3Q5nIdXKYaIhXDG20=",
          "BLUbXbLXCAxXbDnvn/Ok5COLaPMIxRSE+357cwD1kZKg9WCxgvbippk4HeaSATU2NjZDDcA5h84K8aVaCKcYFmw=",
          "BDavFa117tjyWCKXqpJ7XRcCZfm5HyAjfoRqpWFSEwkHXxfTFYOq3rdQiqNjTKVeTodOJ6otaaNPDMLznXiQiKA=",
          "BP+8HTw/kYeQ3hDJzzRPMsCuzhEhBJIKUu8nfYp93V9YQ/tPM+eQdyE067r8HMSSfZkq/SqgxB3Ct1rKgruK9Tg=",
          "BE+CpJMwEIeq+Klx87FmhmKu71aBxO//+7zxAtd56y/XkZu/cIRpq0t4dTpK2ic7leVvYL5iAwig2tbxLEJ/3Nc=",
          "BJn6SeYxnk2rbyXiFN+SkjbhliUVnqNO1g60b2hg9atFGdVm+Nnj2fNWfIvgP8rhPQjGL0ImBRTW3c5+60sz10Y=",
          "BDJkndE9csK3f/fY/lJVJL+U4gbDyitiAReBrIEXoEvfUq4DSV8kqjKyB64juaSRL03VBt8CskVCBZRhoKwrWeI=",
        ],
        "type": "Issue",
      }
    `)
  })
})
