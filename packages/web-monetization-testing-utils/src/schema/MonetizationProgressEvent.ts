export const MonetizationProgressEventSchema = {
  $ref: '#/definitions/MonetizationProgressEvent',
  $schema: 'http://json-schema.org/draft-07/schema#',
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
          type: 'string',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
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
