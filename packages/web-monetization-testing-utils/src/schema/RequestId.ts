export const RequestIdSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://webmonetization.org/schemas/requestId.json',
  type: 'string',
  pattern:
    '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
}
