import {
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateObject(obj: any, types: Record<string, string>) {
  return !Object.entries(types).some(([name, type]) => {
    return typeof obj[name] !== type
  })
}

export function isValidStartEvent(details: MonetizationStartEvent['detail']) {
  return validateObject(details, {
    requestId: 'string',
    paymentPointer: 'string'
  })
}

export function isValidProgressEvent(
  details: MonetizationProgressEvent['detail']
) {
  return validateObject(details, {
    amount: 'string',
    assetCode: 'string',
    assetScale: 'number',
    requestId: 'string',
    paymentPointer: 'string'
  })
}
