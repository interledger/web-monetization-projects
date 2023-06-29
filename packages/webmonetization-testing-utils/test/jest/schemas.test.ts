import { describe, expect, it } from '@jest/globals'
import Ajv from 'ajv'

import { MonetizationStopEventSchema } from '../../src/schema/MonetizationStopEvent'
import { RequestIdSchema } from '../../src/schema/RequestId'

const WM_SCHEMAS = 'https://webmonetization.org/schemas'

describe('Ajv Schemas', () => {
  it('can reference schemas using relative paths', () => {
    const ajv = new Ajv({
      allErrors: true,
      schemas: [MonetizationStopEventSchema, RequestIdSchema]
    })
    expect(ajv.validate(`${WM_SCHEMAS}/monetizationstop-event.json`, {})).toBe(
      false
    )
    expect(ajv.errors).toMatchInlineSnapshot(`
      [
        {
          "instancePath": "",
          "keyword": "required",
          "message": "must have required property 'type'",
          "params": {
            "missingProperty": "type",
          },
          "schemaPath": "#/required",
        },
        {
          "instancePath": "",
          "keyword": "required",
          "message": "must have required property 'detail'",
          "params": {
            "missingProperty": "detail",
          },
          "schemaPath": "#/required",
        },
      ]
    `)
  })
})
