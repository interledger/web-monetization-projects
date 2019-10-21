import { useEffect, useState } from 'react'

import { getDocument, getGlobalWebMonetizationState } from './global'

export function useMonetizationState() {
  // get the singleton WM state
  const webMonetizationState = getGlobalWebMonetizationState()
  webMonetizationState.init()

  const { state, requestId, paymentPointer } = webMonetizationState.getState()
  const [monetizationState, setMonetizationState] = useState({
    state,
    requestId,
    paymentPointer
  })

  useEffect(() => {
    if (!getDocument().monetization) return

    const onStart = () => {
      const {
        state,
        requestId,
        paymentPointer
      } = webMonetizationState.getState()
      setMonetizationState({ state, requestId, paymentPointer })
    }

    webMonetizationState.on('monetizationstart', onStart)

    return () => {
      webMonetizationState.removeListener('monetizationstart', onStart)
    }
  })

  return monetizationState
}
