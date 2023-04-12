import type { GraphQlClient } from '../graphQlClient'

export const loginMutation = `mutation Login($input: LoginInput!) {
  auth: login(input: $input) {
    token
  }
}`

export async function login(
  this: GraphQlClient,
  email: string,
  password: string
): Promise<string> {
  const message = await this.query<{ auth: { token: string } }>({
    query: loginMutation,
    variables: { input: { password, email } }
  })
  if (message.data.auth) {
    return message.data.auth.token
  } else {
    throw new Error(`error logging in: ${JSON.stringify(message)}`)
  }
}
