import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '@coil/extension-popup/theme'
import { ProcessStep } from '@coil/extension-popup/types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as actions from '@coil/extension-popup/redux/actions'
import {
  getHotkeyAmounts,
  getRemainingDailyAmountAllowed
} from '@coil/extension-popup/utils/get-amount-data.utils'
import { IRootState } from '@coil/extension-popup/redux/models'

//
// Styles
//
const PredefinedAmountButtonsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const PredefinedAmountButton = styled('button')({
  cursor: 'pointer',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: Colors.Grey100,
  color: Colors.Grey500,
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  textAlign: 'center',
  padding: '10px 0px',
  width: '54px',
  '&:hover': {
    backgroundColor: Colors.Grey800,
    color: '#FFFFFF'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey50,
    color: Colors.Grey100
  }
})

//
// Component
//
export const PredefinedButtons = (): React.ReactElement => {
  const { hotkeysSubmit, maximumTipLimit } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()

  const handleSelectAmount = (amount: number) => {
    dispatch(actions.set_current_tip_amount(amount))

    if (hotkeysSubmit) {
      dispatch(actions.set_process_step(ProcessStep.Pending))
    }
  }
  return (
    <PredefinedAmountButtonsWrapper>
      {getHotkeyAmounts().map((amount: number, index: number) => {
        return (
          <PredefinedAmountButton
            key={`pdt-${index}`}
            disabled={
              amount > getRemainingDailyAmountAllowed() ||
              amount > maximumTipLimit
            }
            onClick={() => handleSelectAmount(amount)}
          >
            ${amount}
          </PredefinedAmountButton>
        )
      })}
    </PredefinedAmountButtonsWrapper>
  )
}
