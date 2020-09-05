export const MonetizationStartEventSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://webmonetization.org/schemas/monetizationstart-event.json',
  $ref: '#/definitions/MonetizationStartEvent',
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
    MonetizationStartEvent: {
      additionalProperties: true,
      properties: {
        detail: {
          $ref: '#/definitions/MonetizationEventDetail'
        },
        type: {
          const: 'monetizationstart',
          description: 'monetizationstart',
          type: 'string'
        }
      },
      required: ['detail', 'type'],
      type: 'object'
    }
  }
}
