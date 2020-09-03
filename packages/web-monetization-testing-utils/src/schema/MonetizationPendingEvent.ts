export const MonetizationPendingEventSchema = {
  $ref: '#/definitions/MonetizationPendingEvent',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    MonetizationEventDetail: {
      additionalProperties: false,
      properties: {
        paymentPointer: {
          type: 'string'
        },
        requestId: {
          type: 'string',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        }
      },
      required: ['paymentPointer', 'requestId'],
      type: 'object'
    },
    MonetizationPendingEvent: {
      additionalProperties: true,
      properties: {
        detail: {
          $ref: '#/definitions/MonetizationEventDetail'
        },
        type: {
          const: 'monetizationpending',
          description: 'monetizationpending',
          type: 'string'
        }
      },
      required: ['detail', 'type'],
      type: 'object'
    }
  }
}
