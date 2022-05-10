import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'
import { whoamiQuery } from '@coil/client'

import { resolversRoot } from '../../src/graphql/resolvers'
import { Context } from '../../src/types/context'
import { loadedSchemaString } from '../../src/graphql/loaded-schema-string'

describe('Testing Graphql Functions', () => {
  const typeDefs = loadedSchemaString
  const args = { typeDefs, resolvers: resolversRoot }
  const schema = makeExecutableSchema(args)
  const contextValue: Context = { userId: '1' }

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
    // console.log(JSON.stringify(result, null, 2))
  })
})
