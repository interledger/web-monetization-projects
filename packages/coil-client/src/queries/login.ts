import { GraphQlClient } from '..'

export const loginMutation = `mutation Login($email: String!, $password: String!) {
  auth: login(email: $email, password: $password) {
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
    variables: { password, email }
  })
  if (message.data.auth) {
    return message.data.auth.token
  } else {
    throw new Error(`error logging in: ${JSON.stringify(message)}`)
  }
}
