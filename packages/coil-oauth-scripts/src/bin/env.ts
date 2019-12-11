import { GraphQlClient } from '@coil/client'

export const env = (key: string, defaultValue?: string): string => {
  const value = process.env[key]
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`expecting process.env.${key} to be defined`)
    } else {
      return defaultValue
    }
  }
  return value
}

export const COIL_DOMAIN = env('COIL_DOMAIN', 'https://coil.com')
export const COIL_USER = env('COIL_USER')
export const COIL_PASSWORD = env('COIL_PASSWORD')

const ClientOptions = class Options extends GraphQlClient.Options {
  coilDomain = COIL_DOMAIN
}

export const client = new GraphQlClient(new ClientOptions())

export async function login() {
  const token = await client.login(COIL_USER, COIL_PASSWORD)
  const btpToken = await client.refreshBtpToken(token)
  return { token, btpToken }
}
