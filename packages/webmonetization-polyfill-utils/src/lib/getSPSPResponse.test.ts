import { getSPSPResponse } from '@webmonetization/polyfill-utils'
import { SPSPResponse } from '@webmonetization/types'

function makeMockFetch(resp: Partial<Response>) {
  const fn = jest.fn()
  fn.mockReturnValue(resp)
  return fn as typeof fetch
}

describe('getSPSPResponse', () => {
  it('should return an object with connection details', async () => {
    const mockFetch = makeMockFetch({
      ok: true,
      async json() {
        return {
          destination_account: '',
          receipts_enabled: false,
          shared_secret: ''
        } as SPSPResponse
      },
      status: 200
    })
    const response = await getSPSPResponse(
      'https://tags.com/ok',
      'a',
      mockFetch
    )
    expect(mockFetch).toBeCalledWith('https://tags.com/ok', {
      cache: 'no-cache',
      credentials: 'omit',
      headers: { 'Web-Monetization-Id': 'a', accept: 'application/spsp4+json' },
      method: 'GET'
    })
    expect(response).toMatchObject({
      destinationAccount: expect.any(String),
      sharedSecret: expect.any(Buffer),
      receiptsEnabled: expect.any(Boolean)
    })
  })
})
