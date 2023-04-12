export const MonetizationStopEventSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://webmonetization.org/schemas/monetizationstop-event.json',
  $ref: '#/definitions/MonetizationStopEvent',
  definitions: {
    MonetizationStopEvent: {
      additionalProperties: true,
      properties: {
        detail: {
          $ref: '#stopDetail'
        },
        type: {
          const: 'monetizationstop',
          description: 'monetizationstop',
          type: 'string'
        }
      },
      required: ['type', 'detail'],
      type: 'object'
    },
    MonetizationStopEventDetail: {
      $id: '#stopDetail',
      additionalProperties: false,
      properties: {
        finalized: {
          type: 'boolean'
        },
        paymentPointer: {
          type: 'string'
        },
        requestId: {
          $ref: './requestId.json'
        }
      },
      required: ['finalized', 'paymentPointer', 'requestId'],
      type: 'object'
    }
  }
}
