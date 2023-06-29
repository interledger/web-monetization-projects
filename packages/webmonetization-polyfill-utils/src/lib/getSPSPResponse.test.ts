import { describe, expect, it, jest } from '@jest/globals'
import { SPSPResponse as SPSPResponseRaw } from '@webmonetization/types'

import { getSPSPResponse } from './getSPSPResponse'

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
    expect(mockFetch).toHaveBeenCalledWith(TEST_PP, {
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
    const fn = jest.fn<typeof fetch>()
    // noinspection TypeScriptValidateJSTypes
    fn.mockReturnValue(Promise.reject(new Error()))
    await expect(async () => {
      await getSPSPResponse(TEST_PP, TEST_ID, fn)
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      `"No SPSP Response (bad or no network)"`
    )
  })
  it('should throw a bad response error when status != 200', async () => {
    const mockFetch = makeMockFetch({
      ok: false,
      async text() {
        return 'not found'
      },
      status: 404
    })
    await expect(
      async () => await getSPSPResponse(TEST_PP, TEST_ID, mockFetch)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"SPSP Bad Response (status=404, body="not found")"`
    )
  })

  it('should throw an error when the JSON is unparseable', async () => {
    const mockFetch = makeMockFetch({
      ok: true,
      async text() {
        // Object not encoded correctly as JSON
        return `{
          destinationAccount: '',
          receiptsEnabled: false,
          sharedSecret: ''
        }`
      },
      status: 200
    })
    await expect(async () => await getSPSPResponse(TEST_PP, TEST_ID, mockFetch))
      .rejects.toThrowErrorMatchingInlineSnapshot(`
            "SPSP Response JSON unparseable (body={
                      destinationAccount: '',
                      receiptsEnabled: false,
                      sharedSecret: ''
                    })"
          `)
  })

  it('should throw an error when the JSON is parseable but malformed', async () => {
    const mockFetch = makeMockFetch({
      ok: true,
      async text() {
        return JSON.stringify({
          destinationAccount: '',
          receiptsEnabled: false,
          sharedSecret: ''
        })
      },
      status: 200
    })
    await expect(
      async () => await getSPSPResponse(TEST_PP, TEST_ID, mockFetch)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `" SPSP response is malformed (body={"destinationAccount":"","receiptsEnabled":false,"sharedSecret":""})"`
    )
  })
})
