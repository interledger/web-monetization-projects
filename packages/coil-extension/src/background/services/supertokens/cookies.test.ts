import { setCookie } from './cookies'

describe('cookies', () => {
  it('should decode a document.cookie = x call into an object usable by wext api', () => {
    const cookieString =
      'sIRTFrontend=remove;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax'
    const domainUrl = 'https://coil.com'
    const result = setCookie({ cookie: cookieString, domainUrl })
    expect(result).toMatchInlineSnapshot(`
      {
        "domain": "coil.com",
        "expirationDate": 253402300799,
        "httpOnly": false,
        "name": "sIRTFrontend",
        "path": "/",
        "sameSite": "lax",
        "url": "https://coil.com/extension",
        "value": "remove",
      }
    `)
  })
})
