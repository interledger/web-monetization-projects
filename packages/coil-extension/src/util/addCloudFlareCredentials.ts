import { Container } from 'inversify'
import { CLOUDFLARE_ACCESS_CLIENT_ID, CLOUDFLARE_ACCESS_CLIENT_SECRET } from '../webpackDefines'
import * as tokens from '../types/tokens'
import { GraphQlClientOptions } from '@coil/client'

export function addCloudflareCredentials(container: Container) {
  if (CLOUDFLARE_ACCESS_CLIENT_ID) {
    container.bind(tokens.CloudFlareAccessCredentials).toConstantValue({
      clientId: CLOUDFLARE_ACCESS_CLIENT_ID,
      clientSecret: CLOUDFLARE_ACCESS_CLIENT_SECRET
    } as GraphQlClientOptions['cloudflareAccess'])
  }
}
