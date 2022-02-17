import { injectable } from 'inversify'

import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class PaymentPointerAssociations {
  //
  private tabsToFramesToPaymentPointers: {
    [tabId: number]: {
      [frameId: number]: string
    }
  } = {}

  clearTabPaymentPointers(tabId: number) {
    delete this.tabsToFramesToPaymentPointers[tabId]
  }

  clearPaymentPointer({ tabId, frameId }: FrameSpec) {
    const tabsToFramesToPaymentPointers =
      this.tabsToFramesToPaymentPointers[tabId]
    if (tabsToFramesToPaymentPointers) {
      delete tabsToFramesToPaymentPointers[frameId]
    }
  }

  getPaymentPointer({ tabId, frameId }: FrameSpec) {
    return this.tabsToFramesToPaymentPointers[tabId]
      ? this.tabsToFramesToPaymentPointers[tabId][frameId]
      : undefined
  }

  setPaymentPointer({ tabId, frameId }: FrameSpec, paymentPointer: string) {
    const ensured = (this.tabsToFramesToPaymentPointers[tabId] =
      this.tabsToFramesToPaymentPointers[tabId] ?? {})
    ensured[frameId] = paymentPointer
  }
}
