import React, { createContext, useContext, useState, useMemo } from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { getCreditCardFromPaymentMethods } from '../../util/getCreditCardFromPaymentMethods'
import { calculateMaxAllowableTip } from '../../util/calculateMaxAllowableTip'

//
// Models
//
interface ITipContext {
  currentTipAmountUsd: number
  maxAllowableTipAmountUsd: number //* the maxAllowableTip is primarily responsible for disabling tipping inputs
  setCurrentTipAmountUsd: (amount: number) => void
}

interface ITipProvider {
  storage: Pick<StorageService, 'get'>
}

//
// Context
//
const TipContext = createContext({} as ITipContext)

//
// Provider
//
export const TipProvider: React.FC<ITipProvider> = props => {
  const { storage, children } = props

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

  const [currentTipAmountUsd, setCurrentTipAmountUsd] =
    useState<number>(initialTipAmountUsd)
  const [maxAllowableTipAmountUsd, setMaxAllowableTipAmountUsd] =
    useState<number>(maxTipAllowedUsd)

  const providerValue = {
    currentTipAmountUsd: currentTipAmountUsd,
    maxAllowableTipAmountUsd: maxAllowableTipAmountUsd,
    setCurrentTipAmountUsd: setCurrentTipAmountUsd
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
