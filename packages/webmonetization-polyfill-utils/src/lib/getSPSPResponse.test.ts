import { getSPSPResponse } from '@webmonetization/polyfill-utils'
import { SPSPResponse as SPSPResponseRaw } from '@webmonetization/types'

function makeMockFetch(resp: Partial<Response>) {
  const fn = jest.fn()
  fn.mockReturnValue(Promise.resolve(resp))
  return fn as typeof fetch
}

const TEST_PP = 'https://tags.com/ok'
const TEST_ID = '6e9c4d60-bfac-4658-8011-a835d487341b'

const SPSPResponseMatcher = {
  destinationAccount: expect.any(String),
  sharedSecret: expect.any(Buffer),
  receiptsEnabled: expect.any(Boolean)
}

describe('getSPSPResponse', () => {
  it('should return an object with connection details', async () => {
    const mockFetch = makeMockFetch({
      ok: true,
      async text() {
        return JSON.stringify({
          destination_account: '',
          receipts_enabled: false,
          shared_secret: ''
        } as SPSPResponseRaw)
      },
      status: 200
    })
    const response = await getSPSPResponse(TEST_PP, TEST_ID, mockFetch)
    expect(mockFetch).toBeCalledWith(TEST_PP, {
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Web-Monetization-Id': TEST_ID,
        accept: 'application/spsp4+json'
      },
      method: 'GET'
    } as RequestInit)

    expect(response).toMatchObject(SPSPResponseMatcher)
  })
  it('should throw an error when there is no response', async () => {
    const fn = jest.fn()
    // noinspection TypeScriptValidateJSTypes
    fn.mockReturnValue(Promise.reject(new Error()))
    await expect(async () => {
      await getSPSPResponse(TEST_PP, TEST_ID, fn)
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      `"No SPSP Response (bad or no network)"`
    )
  })
})
