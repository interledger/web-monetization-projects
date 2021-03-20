import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '@coil/extension-popup/theme'
import { IRootState } from '@coil/extension-popup/redux/models'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actions from '@coil/extension-popup/redux/actions'
import {
  IncButtonIcon,
  DecButtonIcon
} from '@coil/extension-popup/components/icons'
import { getRemainingDailyAmountAllowed } from '@coil/extension-popup/utils/get-amount-data.utils'

//
// Styles
//
const CurrentAmountWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  fontVariantNumeric: 'tabular-nums',
  height: '62px'
})

const IncDecButton = styled('button')({
  cursor: 'pointer',
  width: '32px',
  height: '32px',
  border: 'none',
  borderRadius: '32px',
  backgroundColor: Colors.Grey100,
  color: Colors.Grey500,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: Colors.Grey800,
    color: '#FFFFFF'
  },
  '&:disabled': {
    color: Colors.Grey100,
    backgroundColor: Colors.Grey50,
    cursor: 'not-allowed'
  }
})

const Amount = styled('div')({
  fontSize: '64px',
  fontWeight: 'bold',
  fontVariantNumeric: 'tabular-nums',
  color: Colors.Grey800,
  letterSpacing: '0px'
})

const InputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > span': {
    fontSize: '64px',
    fontWeight: 'bold',
    color: Colors.Grey800,
    letterSpacing: '0px'
  }
})

const Input = styled('input')({
  fontFamily: 'CircularStd',
  fontSize: '64px',
  fontWeight: 'bold',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '50px',
  width: '50px',
  maxWidth: '100%',
  transition: 'width 0s',
  color: Colors.Grey800,
  letterSpacing: '0px',
  backgroundColor: 'transparent',
  border: 'none',
  '&:focus, &:active': {
    outline: 'none'
  },
  '&::placeholder': {
    color: Colors.Grey100,
    opacity: 1 /* Firefox */
  }
})

const WarningWrapper = styled('div')({
  color: Colors.Red700,
  textAlign: 'center',
  fontWeight: 'normal',
  height: '22px'
})

//
// Models
//
enum IncDec {
  Inc,
  Dec
}

//
// Component
//
export const AmountInput = (): React.ReactElement => {
  const [isUserInput, setIsUserInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentTipAmount, minimumTipLimit, maximumTipLimit } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()

  // set focus to the input field when it loads. Cannot use 'autoFocus' because eslint-plugin-jsx-a11y
  useEffect(() => {
    if (isUserInput && inputRef.current) {
      inputRef.current.focus()

      // Make sure the input width is correct on focus.
      inputRef.current.style.width = `${
        currentTipAmount.toString().length * 40
      }px`

      //* if the input needs to provide the current value when the user wants to input
      // inputRef.current.style.width = `${inputRef.current.value.length * 40}px`
    }
  }, [isUserInput])

  const handleIncDecClick = (type: IncDec) => {
    let amount = currentTipAmount
    if (type === IncDec.Inc) {
      if (amount == maximumTipLimit) return
      amount = amount + 1
    } else if (type == IncDec.Dec) {
      amount = amount - 1
    }

    dispatch(actions.set_current_tip_amount(amount))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mask input value to ensure only digits.
    const isNum = e.target.value.slice(-1).match(/\d+/)
    if (isNum == null) e.target.value = e.target.value.slice(0, -1)

    // Ensure value is valid
    let value = parseInt(e.target.value)
    if (value == 0 || isNaN(value)) {
      value = minimumTipLimit
    }

    // handle if the input is higher than the maximum tip
    if (value > maximumTipLimit) {
      value = maximumTipLimit
      if (isUserInput && inputRef.current) {
        inputRef.current.value = value.toString()
      }
    }

    // handle if the input is higher than the remaining daily limit
    if (value > getRemainingDailyAmountAllowed()) {
      value = getRemainingDailyAmountAllowed()
      if (isUserInput && inputRef.current) {
        inputRef.current.value = value.toString()
      }
    }

    // set input box size
    // NB that this is done after masking.
    e.target.style.width = `${e.target.value.length * 40}px`

    // update state
    dispatch(actions.set_current_tip_amount(value))
  }

  return (
    <div>
      <CurrentAmountWrapper>
        <IncDecButton
          disabled={currentTipAmount <= minimumTipLimit}
          onClick={() => handleIncDecClick(IncDec.Dec)}
        >
          <DecButtonIcon />
        </IncDecButton>
        {isUserInput ? (
          // render tip manual input
          <InputWrapper>
            <span>$</span>
            <Input
              ref={inputRef}
              type='numerical'
              maxLength={4}
              size={1}
              //value={currentTipAmount}  //* if the input needs to provide the current value when the user wants to input
              placeholder={currentTipAmount.toString()}
              onChange={e => handleInputChange(e)}
              onBlur={() => setIsUserInput(false)}
            />
          </InputWrapper>
        ) : (
          // render tip display
          <Amount onClick={() => setIsUserInput(true)}>
            ${currentTipAmount}
          </Amount>
        )}
        <IncDecButton
          disabled={
            currentTipAmount >= getRemainingDailyAmountAllowed() ||
            currentTipAmount == maximumTipLimit
          }
          onClick={() => handleIncDecClick(IncDec.Inc)}
        >
          <IncButtonIcon />
        </IncDecButton>
      </CurrentAmountWrapper>
      <WarningWrapper>
        {currentTipAmount >= getRemainingDailyAmountAllowed() ? (
          <span>Daily tipping limit reached </span>
        ) : currentTipAmount == maximumTipLimit ? (
          <span>Maximum amount for tip</span>
        ) : null}
      </WarningWrapper>
    </div>
  )
}
