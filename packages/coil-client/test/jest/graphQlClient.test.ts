import { decodeToken, GraphQlClient, loginMutation } from '@coil/client'
import fetch from 'node-fetch'

import { testToken } from '../fixtures/testToken'

describe('GraphQlClient#login', () => {
  it('should return a token via login method', async () => {
    const testFetch = jest.fn()

    class TestOptions extends GraphQlClient.Options {
      public fetch = testFetch
    }
    const response: Pick<Response, 'ok' | 'json'> = {
      ok: true,
      async json() {
        return { data: { auth: { token: testToken } } }
      }
    }
    testFetch.mockResolvedValue(response)

    const client = new GraphQlClient(new TestOptions())
    const password = 'thereisnoplacelikearstdhneio'
    const email = 'ndudfield@gmail.com'

    const token = await client.login(email, password)
    const params: Parameters<typeof fetch> = [
      'https://coil.com/gateway', //? change from /graphql to /gateway
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: ''
        },
        body:
          `{"query":${JSON.stringify(loginMutation)},` +
          `"variables":{"input":{"password":"${password}","email":"${email}"}}}`
      }
    ]
    expect(testFetch).toHaveBeenCalledWith(...params)
    expect(token).toBe(testToken)
    expect(decodeToken(token)).toStrictEqual({
      exp: 1567039068,
      iat: 1564619868,
      userId: 'cjyf1on2b8bs40706kfgy5wq2'
    })
  })
})
