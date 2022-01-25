import React, { createContext, useContext, useState, useMemo } from 'react'
import { StorageService } from '@webmonetization/wext/services'

import { getCreditCardFromPaymentMethods } from '../../util/getCreditCardFromPaymentMethods'

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
// Utils
//
const calculateMaxTipAllowed = (
  monetized: boolean,
  inTippingBeta: boolean,
  hasCreditCard: boolean,
  tipCredits: number,
  remainingDailyAmount: number
) => {
  let newMax = 0
  if (!monetized) {
    // if the site is not monetized, the user is not allowed to tip, therefore
    // the max is zero
    return newMax
  }
  if (inTippingBeta && hasCreditCard) {
    // if the user is in the beta they are allowed to use a cc
    // if the user has a cc the only limit that matters is the max daily
    newMax = remainingDailyAmount
  } else {
    // user is not in beta and can only tip with credits
    // if credits is less than daily limit -> limit is credits
    // if credits is greater than daily limit -> limit is daily limit
    if (tipCredits < remainingDailyAmount) {
      newMax = tipCredits
    } else {
      newMax = remainingDailyAmount
    }
  }
  return newMax
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

  const maxTipAllowed = calculateMaxTipAllowed(
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
