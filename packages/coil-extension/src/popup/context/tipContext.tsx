import React, { createContext, useContext, useState } from 'react'

//
// Models
//
interface ITipContext {
  currentTipAmount: number
  maxAllowableTipAmount: number
  setCurrentTipAmount: (amount: number) => void
}

// Context
const TipContext = createContext({} as ITipContext)

// Provider
export const TipProvider: React.FC = props => {
  const storedDailyTipLimitRemaining = 100
  const storedTipCredits = 10
  const tippingBetaFeatureFlag = true
  const hasStoredCreditCard = true

  // this could be a util instead of storing in state if initializing with the correct values doesn't work
  const calculateMax = () => {
    // calculate max here
    let newMax = 0
    if (tippingBetaFeatureFlag == true) {
      // if the user has a cc on file
      // only true limit is daily limit
      // otherwise limit is tip credits
      if (hasStoredCreditCard) {
        newMax = storedDailyTipLimitRemaining
      } else {
        newMax = storedTipCredits
      }
    } else {
      // user is not in beta and can only tip with credits
      // if credits is less than daily limit -> limit is credits
      // if credits is greater than daily limit -> limit is daily limit
      if (storedTipCredits < storedDailyTipLimitRemaining) {
        newMax = storedTipCredits
      } else {
        newMax = storedDailyTipLimitRemaining
      }
    }
    return newMax
  }

  const max = calculateMax()

  const [currentTipAmount, setCurrentTipAmount] = useState<number>(12)
  const [maxAllowableTipAmount, setMaxAllowableTipAmount] =
    useState<number>(max)

  const updateCurrentTipAmount = (amount: number) => {
    setCurrentTipAmount(amount)
  }

  const providerValue = {
    currentTipAmount: currentTipAmount,
    maxAllowableTipAmount: maxAllowableTipAmount,
    setCurrentTipAmount: updateCurrentTipAmount
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

// // Reducers
// export const SOME_ACTION = 'SOME_ACTION'
// export const UPDATE_CURRENT_TIP_AMOUNT = 'UPDATE_CURRENT_TIP_AMOUNT'

// export const tipReducer = (state, action) => {
//   switch(action.type){
//     case UPDATE_CURRENT_TIP_AMOUNT:
//       let updatedState = [...state]
//       const
//       return state
//     default: return state
//   }
// }

// const defaultState = {
//   currentTipAmount: 1, // need to initialize from user.tipSettings.lastTippedAmount
//   allowableMaximumTipAmount: 10, // need to initialize based on daily tip limit - tip credit balance - tipping-beta featrue flag
// }
// const [ tipState, dispatch ] = useReducer(tipReducer, defaultState)
