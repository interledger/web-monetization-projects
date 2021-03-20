import { useSelector, shallowEqual } from 'react-redux'
import { ProcessStep } from '@coil/extension-popup/types'
import { IRootState } from '@coil/extension-popup/redux/models'
import { TipView } from './TipView'
import { PendingView } from './PendingView'
import { CompleteView } from './CompleteView'
import React from 'react'

export const DesignFour = (): React.ReactElement => {
  const { processStep } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )

  switch (processStep) {
    case ProcessStep.Complete:
      return <CompleteView />
    case ProcessStep.Pending:
      return <PendingView />
    case ProcessStep.Tip:
    default:
      return <TipView />
  }
}
