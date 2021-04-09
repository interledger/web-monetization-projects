/*
    TipRouter
    
    The tip router is responsible for all the local state that is relative the the tipping process as well as the logic that determines which tipping view is rendered. Also will need to pass context down to the rendered components.
*/

import React, { useState } from 'react'

import { TipView } from './TipView'
import { TipConfirmView } from './TipConfirmView'
import { TipCompleteView } from './TipCompleteView'

//
// Models
//
export enum TipProcessStep {
  TIP = 'TIP',
  TIP_CONFIRM = 'TIP_CONFIRM',
  TIP_COMPLETE = 'TIP_COMPLETE'
}

export interface ITipView {
  currentTipAmount: number
  setCurrentTipAmount: (amount: number) => void
  setTipProcessStep: (step: TipProcessStep) => void
}

//
// Component
//
export const TipRouter = () => {
  const [tipProccessStep, setTipProcessStep] = useState<TipProcessStep>(
    TipProcessStep.TIP
  )
  const [currentTipAmount, setCurrentTipAmount] = useState<number>(1)

  switch (tipProccessStep) {
    case TipProcessStep.TIP_COMPLETE: {
      return <TipCompleteView currentTipAmount={currentTipAmount} />
    }
    case TipProcessStep.TIP_CONFIRM: {
      return (
        <TipConfirmView
          currentTipAmount={currentTipAmount}
          setTipProcessStep={setTipProcessStep}
        />
      )
    }
    case TipProcessStep.TIP:
    default: {
      return (
        <TipView
          currentTipAmount={currentTipAmount}
          setCurrentTipAmount={setCurrentTipAmount}
          setTipProcessStep={setTipProcessStep}
        />
      )
    }
  }
}
