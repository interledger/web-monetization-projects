import React, { createContext, useContext, useState, useMemo } from 'react'
import { StorageService } from '@webmonetization/wext/services'

//
// Models
//
interface ITipContext {
  currentTipAmount: number
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

  const {
    tipSettings: { lastTippedAmount = 1, maxAllowableTipAmount = 0 } = {}
  } = userObject ?? {}

  const initialTipAmount =
    maxAllowableTipAmount < lastTippedAmount
      ? maxAllowableTipAmount
      : lastTippedAmount

  const [currentTipAmount, setCurrentTipAmount] =
    useState<number>(initialTipAmount)

  const providerValue = {
    currentTipAmount: currentTipAmount,
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
