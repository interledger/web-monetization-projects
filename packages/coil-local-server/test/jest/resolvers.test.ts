import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'
import {
  adaptedPageQuery,
  featureEnabledQuery,
  loginMutation,
  queryTokenQuery,
  refreshBtpTokenQuery,
  whoamiQuery
} from '@coil/client'

import { resolversRoot } from '../../src/graphql/resolvers'
import { Context } from '../../src/types/context'
import { loadedSchemaString } from '../../src/graphql/loaded-schema-string'

describe('Testing Graphql Functions', () => {
  const typeDefs = loadedSchemaString
  const args = { typeDefs, resolvers: resolversRoot }
  const schema = makeExecutableSchema(args)
  const contextValue: Context = { userId: '1', log: console.log.bind(console) }

  it('should execute the @coil/client whoamiQuery', async () => {
    const result = await graphql({ schema, source: whoamiQuery, contextValue })

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "whoami": Object {
            "canTip": false,
            "currencyPreferences": Object {
              "code": "USD",
              "scale": 1,
            },
            "customerId": null,
            "email": "niq@coil.com",
            "fullName": null,
            "id": "1",
            "paymentMethods": Array [],
            "profilePicture": null,
            "shortName": "Niq",
            "subscription": Object {
              "active": true,
              "endDate": "2022-05-10T03:57:26.230Z",
              "trialEndDate": "2022-05-10T03:57:26.230Z",
            },
          },
        },
      }
    `)
  })
  it('should execute the @coil/client adaptedPage query', async () => {
    const result = await graphql({
      schema,
      source: adaptedPageQuery,
      contextValue,
      variableValues: {
        url: 'https://localhost',
        channelId: 'xyz'
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "adaptedPage": Object {
            "channelImage": null,
            "paymentPointer": "$ilp.uphold.com/gRa4mXFEMYrL",
          },
        },
      }
    `)
  })
  it('should execute the @coil/client featureEnabled query', async () => {
    const result = await graphql({
      schema,
      source: featureEnabledQuery,
      contextValue,
      variableValues: {
        key: 'sunshine'
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "featureEnabled": true,
        },
      }
    `)
  })

  it('should execute the @coil/client login mutation', async () => {
    const result = await graphql({
      schema,
      source: loginMutation,
      contextValue,
      variableValues: {
        input: {
          email: 'niq@coil.com',
          password: 'password!'
        }
      }
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "auth": Object {
            "token": "<JWT-TODO>",
          },
        },
      }
    `)
  })

  it('should execute the @coil/client queryToken query', async () => {
    const result = await graphql({
      schema,
      source: queryTokenQuery,
      contextValue
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "refreshToken": Object {
            "token": "<JWT-TODO>",
          },
          "whoami": Object {
            "canTip": false,
            "currencyPreferences": Object {
              "code": "USD",
              "scale": 1,
            },
            "customerId": null,
            "email": "niq@coil.com",
            "fullName": null,
            "id": "1",
            "paymentMethods": Array [],
            "profilePicture": null,
            "shortName": "Niq",
            "subscription": Object {
              "active": true,
              "endDate": "2022-05-10T03:57:26.230Z",
              "trialEndDate": "2022-05-10T03:57:26.230Z",
            },
          },
        },
      }
    `)
  })

  it('should execute the @coil/client refreshBtpToken query', async () => {
    const result = await graphql({
      schema,
      source: refreshBtpTokenQuery,
      contextValue
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "refreshBtpToken": Object {
            "token": "<JWT-TODO>",
          },
        },
      }
    `)
  })
})
