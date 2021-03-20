import { useSelector, shallowEqual } from 'react-redux'
import { ProcessStep } from '@coil/extension-popup/types'
import { IRootState } from '@coil/extension-popup/redux/models'
import { TipView } from './TipView'
import { CompleteView } from './CompleteView'
import React from 'react'

export const DesignTwo = (): React.ReactElement => {
  const { processStep } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )

  switch (processStep) {
    case ProcessStep.Pending:
    case ProcessStep.Complete:
      return <CompleteView />
    case ProcessStep.Tip:
    default:
      return <TipView />
  }
}
