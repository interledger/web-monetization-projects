import { portableFetch } from './portableFetch'

export interface SPSPResponse {
  destinationAccount: string
  sharedSecret: Buffer
}

export async function getSPSPResponse(
  spspUrl: string,
  monetizationId: string
): Promise<SPSPResponse> {
  const response = await portableFetch(spspUrl, {
    method: 'GET',
    // Do not send cookies or other tracking details
    credentials: 'omit',
    cache: 'no-cache',
    headers: {
      accept: 'application/spsp4+json',
      'Web-Monetization-Id': monetizationId
    }
  })

  if (!response.ok) {
    throw new Error('spsp request failed. status=' + response.status)
  }

  const details = await response.json()

  return {
    destinationAccount: details.destination_account,
    sharedSecret: Buffer.from(details.shared_secret, 'base64')
  }
}
