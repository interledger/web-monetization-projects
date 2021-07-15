import {
  MonetizationEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationStopEvent,
  TipEvent
} from '@webmonetization/types'

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

export function isValidStopEvent(details: MonetizationStopEvent['detail']) {
  return validateObject(details, {
    requestId: 'string',
    paymentPointer: 'string',
    finalized: 'boolean'
  })
}

export function hasCommonRequestIdAndPaymentPointer(
  e1: MonetizationEvent['detail'],
  e2: MonetizationEvent['detail']
) {
  return e1.requestId === e2.requestId && e1.paymentPointer == e2.paymentPointer
}

export const isValidPendingEvent = isValidStartEvent

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

export function isValidTipEvent(details: TipEvent['detail']) {
  return validateObject(details, {
    amount: 'string',
    assetCode: 'string',
    assetScale: 'number',
    paymentPointer: 'string'
  })
}
