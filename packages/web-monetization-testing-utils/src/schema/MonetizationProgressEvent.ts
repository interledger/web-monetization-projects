export const MonetizationProgressEventSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://webmonetization.org/schemas/monetizationprogress-event.json',
  $ref: '#/definitions/MonetizationProgressEvent',
  definitions: {
    MonetizationProgressEvent: {
      additionalProperties: true,
      properties: {
        detail: {
          $ref: '#/definitions/MonetizationProgressEventDetail'
        },
        type: {
          const: 'monetizationprogress',
          description: 'monetizationprogress',
          type: 'string'
        }
      },
      required: ['detail', 'type'],
      type: 'object'
    },
    MonetizationProgressEventDetail: {
      additionalProperties: false,
      properties: {
        amount: {
          type: 'string'
        },
        assetCode: {
          type: 'string'
        },
        assetScale: {
          type: 'number'
        },
        paymentPointer: {
          type: 'string'
        },
        receipt: {
          type: 'string'
        },
        requestId: {
          $ref: './requestId.json'
        }
      },
      required: [
        'amount',
        'assetCode',
        'assetScale',
        'paymentPointer',
        'requestId'
      ],
      type: 'object'
    }
  }
}
