import { GraphQlClient } from '..'

export interface FeatureEnabledData {
  featureEnabled: boolean
}

export const featureEnabledQuery = `query getFeatureFlag($key: String!){
  featureEnabled(key: $key)
}`

export async function featureEnabled(
  this: GraphQlClient,
  token?: string,
  key?: string
) {
  if (!key) {
    key = token
    token = undefined
  }
  return this.query<FeatureEnabledData>({
    query: featureEnabledQuery,
    token,
    variables: { key: key }
  })
}
