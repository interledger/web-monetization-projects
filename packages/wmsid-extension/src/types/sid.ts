export interface MonetizationAmount {
  value: string
  assetScale: number
  assetCode: string
}

export interface SPSPResponse {
  destinationAccount: string
  sharedSecret: string
  receiptsEnabled: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void

interface WebExtEvt<C extends Callback = Callback> {
  addListener(listener: C): void
  removeListener(listener: C): void
  hasListener(listener: C): boolean
}

export interface ExtensionMonetization {
  onStart: WebExtEvt<(sessionId: string, spspResponse: SPSPResponse) => void>
  onStop: WebExtEvt

  onPause: WebExtEvt
  onResume: WebExtEvt

  /**
   * - Returns a Promise of a new sessionId
   *  - may be rejected
   * - Causes an onStop with old sessionId, then onStart with new one
   * This should all happen AFTER the return promise resolve handlers have
   * run ?
   */
  refresh(/*SPSP*/ sessionId: string): Promise<string>

  completePayment(
    sessionId: string,
    amount: MonetizationAmount,
    receipt?: string
  ): void
}

export interface PageMonetization extends EventTarget {
  onprogress: EventHandlerNonNull
}

declare global {
  interface Navigator {
    monetization: PageMonetization
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars
declare namespace browser {
  const monetization: ExtensionMonetization
}
