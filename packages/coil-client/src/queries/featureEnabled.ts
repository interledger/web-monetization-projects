import { GraphQlClient } from '..'

export interface FeatureEnabledData {
  featureEnabled: boolean
}

export const featureEnabledQuery = `query getFeatureFlag($key: String!){
  featureEnabled(key: $key)
}`

export async function featureEnabled(
  this: GraphQlClient,
  key: string,
  token?: string
) {
  return this.query<FeatureEnabledData>({
    query: featureEnabledQuery,
    token,
    variables: { key: key }
  })
}
