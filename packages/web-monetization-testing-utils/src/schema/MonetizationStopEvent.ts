export const MonetizationStopEventSchema = {
  $ref: '#/definitions/MonetizationStopEvent',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    MonetizationStopEvent: {
      additionalProperties: true,
      properties: {
        detail: {
          $ref: '#/definitions/MonetizationStopEventDetail'
        },
        type: {
          const: 'monetizationstop',
          description: 'monetizationstop',
          type: 'string'
        }
      },
      required: ['type'],
      type: 'object'
    },
    MonetizationStopEventDetail: {
      additionalProperties: false,
      properties: {
        finalized: {
          type: 'boolean'
        },
        paymentPointer: {
          type: 'string'
        },
        requestId: {
          type: 'string',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        }
      },
      required: ['finalized', 'paymentPointer', 'requestId'],
      type: 'object'
    }
  }
}
