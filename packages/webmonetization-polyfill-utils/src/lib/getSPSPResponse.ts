import { portableFetch } from './portableFetch'
import { CustomError } from './CustomError'

export interface SPSPResponse {
  destinationAccount: string
  sharedSecret: Buffer
  receiptsEnabled?: boolean
}

export class SPSPError extends CustomError {
  constructor(message: string, public response?: Response) {
    super(message)
  }
}

export async function getSPSPResponse(
  spspUrl: string,
  monetizationId: string,
  fetchFunc = portableFetch
): Promise<SPSPResponse> {
  let response: Response

  try {
    response = await fetchFunc(spspUrl, {
      method: 'GET',
      // Do not send cookies or other tracking details
      credentials: 'omit',
      cache: 'no-cache',
      headers: {
        accept: 'application/spsp4+json',
        // DEPRECATED: this header is unnecessary with STREAM receipts
        'Web-Monetization-Id': monetizationId
      }
    })
  } catch (e) {
    throw new SPSPError('failed_to_fetch')
  }

  if (!response.ok) {
    throw new SPSPError(
      `spsp request failed. status=${response.status}`,
      response
    )
  }

  const details = await response.json()

  return {
    destinationAccount: details.destination_account,
    sharedSecret: Buffer.from(details.shared_secret, 'base64'),
    receiptsEnabled: details.receipts_enabled
  }
}
