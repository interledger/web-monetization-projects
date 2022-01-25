import React, { createContext, useContext, useState, useMemo } from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { getCreditCardFromPaymentMethods } from '../../util/getCreditCardFromPaymentMethods'
import { calculateMaxAllowableTip } from '../../util/calculateMaxAllowableTip'

//
// Models
//
interface ITipContext {
  currentTipAmount: number
  maxAllowableTipAmount: number //* the maxAllowableTip is primarily responsible for disabling tipping inputs
  setCurrentTipAmount: (amount: number) => void
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
      lastTippedAmount = 1,
      tipCredits = 0,
      remainingDailyAmount = 0
    } = {},
    paymentMethods,
    tippingBetaFeatureFlag
  } = userObject ?? {}

  const creditCard = getCreditCardFromPaymentMethods(paymentMethods)

  const maxTipAllowed = calculateMaxAllowableTip(
    monetized,
    tippingBetaFeatureFlag,
    !!creditCard,
    tipCredits,
    remainingDailyAmount
  )

  const initialTipAmount =
    maxTipAllowed < lastTippedAmount ? maxTipAllowed : lastTippedAmount

  const [currentTipAmount, setCurrentTipAmount] =
    useState<number>(initialTipAmount)
  const [maxAllowableTipAmount, setMaxAllowableTipAmount] =
    useState<number>(maxTipAllowed)

  const providerValue = {
    currentTipAmount: currentTipAmount,
    maxAllowableTipAmount: maxAllowableTipAmount,
    setCurrentTipAmount: setCurrentTipAmount
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
