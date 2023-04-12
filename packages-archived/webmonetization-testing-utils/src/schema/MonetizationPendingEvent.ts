export const MonetizationPendingEventSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://webmonetization.org/schemas/monetizationpending-event.json',
  $ref: '#/definitions/MonetizationPendingEvent',
  definitions: {
    MonetizationEventDetail: {
      additionalProperties: false,
      properties: {
        paymentPointer: {
          type: 'string'
        },
        requestId: {
          $ref: './requestId.json'
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
