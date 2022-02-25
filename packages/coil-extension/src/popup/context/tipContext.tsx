import React, { createContext, useContext, useState, useEffect } from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { PopupHost } from '../types'
import { getCreditCardFromPaymentMethods } from '../../util/getCreditCardFromPaymentMethods'
import { calculateMaxAllowableTip } from '../../util/calculateMaxAllowableTip'

//
// Models
//
export interface ITipContext {
  currentTipAmountUsd: number
  finalTipAmountUsd: number //* only used for the TipCompleteView so it renders the proper amount after local storage updates
  maxAllowableTipAmountUsd: number //* the maxAllowableTip is primarily responsible for disabling tipping inputs
  setCurrentTipAmountUsd: (amount: number) => void
  setFinalTipAmountUsd: (amount: number) => void
}

interface ITipProvider {
  storage: Pick<StorageService, 'get'>
  host: PopupHost
}

type StorageEventPartial = Pick<StorageEvent, 'key' | 'newValue'>

//
// Context
//
const TipContext = createContext({} as ITipContext)

//
// Provider
//
export const TipProvider: React.FC<ITipProvider> = props => {
  const { storage, host, children } = props
  const [currentTipAmountUsd, setCurrentTipAmountUsd] = useState<number>(0)
  const [finalTipAmountUsd, setFinalTipAmountUsd] = useState<number>(0)
  const [maxAllowableTipAmountUsd, setMaxAllowableTipAmountUsd] =
    useState<number>(0)

  // Gets the values from localstorage and updates the tipping settings based on the returned values
  const setValuesFromStorage = () => {
    const userObject = storage.get('user')
    const monetized = storage.get('monetized')

    const {
      tipSettings: {
        lastTippedAmountUsd = 0,
        totalTipCreditAmountUsd = 0,
        limitRemainingAmountUsd = 0,
        minTipLimitAmountUsd = 1
      } = {},
      paymentMethods,
      tippingBetaFeatureFlag
    } = userObject ?? {}

    const creditCard = getCreditCardFromPaymentMethods(paymentMethods)

    const maxTipAllowedUsd = calculateMaxAllowableTip(
      monetized,
      tippingBetaFeatureFlag,
      !!creditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    let initialTipAmountUsd = minTipLimitAmountUsd
    if (lastTippedAmountUsd > 0) {
      if (maxTipAllowedUsd < lastTippedAmountUsd) {
        initialTipAmountUsd = maxTipAllowedUsd
      } else {
        initialTipAmountUsd = lastTippedAmountUsd
      }
    }
    if (maxTipAllowedUsd === 0) {
      initialTipAmountUsd = maxTipAllowedUsd
    }

    setCurrentTipAmountUsd(initialTipAmountUsd)
    setMaxAllowableTipAmountUsd(maxTipAllowedUsd)
  }

  useEffect(() => {
    setValuesFromStorage() // set the initial values

    // need to update the values whenever the store user object is updated
    const events = host.events
    events.on('storage', (evt: StorageEventPartial) => {
      if (evt.key === 'user') {
        setValuesFromStorage()
      }
    })
  }, [])

  const providerValue = {
    currentTipAmountUsd: currentTipAmountUsd,
    finalTipAmountUsd: finalTipAmountUsd,
    maxAllowableTipAmountUsd: maxAllowableTipAmountUsd,
    setCurrentTipAmountUsd: setCurrentTipAmountUsd,
    setFinalTipAmountUsd: setFinalTipAmountUsd
  }

  return (
    <TipContext.Provider value={providerValue}>{children}</TipContext.Provider>
  )
}

//
// Hook
//
export const useTip = () => {
  const context = useContext(TipContext)
  return context
}
