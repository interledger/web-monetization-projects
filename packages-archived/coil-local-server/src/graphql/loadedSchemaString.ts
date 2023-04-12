import { readFileSync } from 'fs'

export const loadedSchemaString = readFileSync(
  `${__dirname}/schema.graphql`,
  'utf-8'
)
