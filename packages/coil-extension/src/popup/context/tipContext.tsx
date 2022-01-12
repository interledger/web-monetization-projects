import React, { createContext, useContext, useState, useMemo } from 'react'
import { StorageService } from '@webmonetization/wext/services'

//
// Models
//
interface ITipContext {
  currentTipAmount: number
  maxAllowableTipAmount: number // possibly move to background in formatTipSettings util when done
  setCurrentTipAmount: (amount: number) => void
}

interface ITipProvider {
  storage: Pick<StorageService, 'get'>
}

// Context
const TipContext = createContext({} as ITipContext)

// Provider
export const TipProvider: React.FC<ITipProvider> = props => {
  const { storage, children } = props
  const userObject = storage.get('user')

  // todo: need to add tipCredits and paymentMethods to background queries
  // todo: when nathan and brandon are done with COIL-1642 and COIL-1674
  const {
    tipSettings: {
      lastTippedAmountUSD = 1,
      inTippingBeta = false,
      remainingDailyAmount = 0
    } = {},
    paymentMethods,
    tipCredits = 0
  } = userObject ?? {}

  const creditCard = paymentMethods?.find((method: any) => {
    if (method?.type === 'stripe') {
      return method
    }
  })

  // todo: this could be a util instead of storing in state if initializing with the correct values doesn't work
  // todo: possibly move to background in formatTipSettings util when done
  const calculateMax = (
    inTippingBeta: boolean,
    hasCreditCard: boolean,
    tipCredits: number,
    remainingDailyAmount: number
  ) => {
    let newMax = 0
    if (inTippingBeta && creditCard) {
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

  const max = calculateMax(
    inTippingBeta,
    !!creditCard,
    tipCredits,
    remainingDailyAmount
  ) // possibly move to background in formatTipSettings util when done
  const initialTipAmount = max < lastTippedAmountUSD ? max : lastTippedAmountUSD

  const [currentTipAmount, setCurrentTipAmount] =
    useState<number>(initialTipAmount)
  const [maxAllowableTipAmount, setMaxAllowableTipAmount] =
    useState<number>(max) // possibly move to background in formatTipSettings util when done

  const providerValue = {
    currentTipAmount: currentTipAmount,
    maxAllowableTipAmount: maxAllowableTipAmount,
    setCurrentTipAmount: setCurrentTipAmount
  }

  return (
    <TipContext.Provider value={providerValue}>{children}</TipContext.Provider>
  )
}

// Hook
export const useTip = () => {
  const context = useContext(TipContext)
  return context
}
