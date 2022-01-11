import React, { createContext, useContext, useState } from 'react'

import { useStore } from './storeContext'

//
// Models
//
interface ITipContext {
  currentTipAmount: number
  setCurrentTipAmount: (amount: number) => void
}

// Context
const TipContext = createContext({} as ITipContext)

// Provider
export const TipProvider: React.FC = props => {
  const store = useStore()
  const [currentTipAmount, setCurrentTipAmount] = useState<number>(0)

  const providerValue = {
    currentTipAmount: currentTipAmount,
    setCurrentTipAmount: setCurrentTipAmount
  }
  return (
    <TipContext.Provider value={providerValue}>
      {props.children}
    </TipContext.Provider>
  )
}

// Hook
export const useTip = () => {
  const context = useContext(TipContext)
  return context
}
