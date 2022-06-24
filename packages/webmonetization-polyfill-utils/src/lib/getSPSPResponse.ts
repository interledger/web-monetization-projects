import { SPSPResponse as SPSPResponseRaw } from '@webmonetization/types'

import { portableFetch } from './portableFetch'
import { CustomError } from './CustomError'

export interface SPSPResponse {
  destinationAccount: string
  sharedSecret: Buffer
  receiptsEnabled?: boolean
}

enum ErrorType {
  NoResponse,
  BadResponse,
  UnparseableJSON,
  MalformedJSON
}

export class SPSPError extends CustomError {
  constructor(
    message: string,
    public errorType: ErrorType,
    public response?: Response
  ) {
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
      // TODO:WM2 how to set this in correspondence with the crossorigin
      // setting on the link tag
      credentials: 'omit',
      cache: 'no-cache',
      headers: {
        accept: 'application/spsp4+json',
        // DEPRECATED: this header is unnecessary with STREAM receipts
        'Web-Monetization-Id': monetizationId
      }
    })
  } catch (e) {
    throw new SPSPError(
      'No SPSP Response (bad or no network)',
      ErrorType.NoResponse
    )
  }

  const responseBody = await response.text()

  if (!response.ok) {
    throw new SPSPError(
      `SPSP Bad Response (status=${response.status}, ` +
        `body=${JSON.stringify(responseBody)})`,
      ErrorType.BadResponse,
      response
    )
  }

  let details: SPSPResponseRaw
  try {
    details = JSON.parse(responseBody)
  } catch (e) {
    throw new SPSPError(
      `SPSP Response JSON unparseable (body=${responseBody})`,
      ErrorType.UnparseableJSON,
      response
    )
  }

  if (
    typeof details.destination_account !== 'string' ||
    typeof details.shared_secret !== 'string' ||
    (typeof details.receipts_enabled !== 'boolean' &&
      typeof details.receipts_enabled !== 'undefined')
  ) {
    throw new SPSPError(
      ` SPSP response is malformed (body=${responseBody})`,
      ErrorType.MalformedJSON,
      response
    )
  }

  return {
    destinationAccount: details.destination_account,
    sharedSecret: Buffer.from(details.shared_secret, 'base64'),
    receiptsEnabled: Boolean(details.receipts_enabled)
  }
}
