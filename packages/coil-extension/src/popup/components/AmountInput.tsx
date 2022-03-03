import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { useStore } from '../context/storeContext'
import { ITipContext, useTip } from '../context/tipContext'
import { User } from '../../types/user'

import { IncDecButton, IncDec } from './IncDecButton'

//
// Styles
//
const CurrentAmountWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '62px'
})

const Amount = styled('div')(
  ({ size, disabled }: { size: number; disabled: boolean }) => ({
    pointerEvents: disabled ? 'none' : 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: `${size}px`,
    fontWeight: 'bold',
    color: disabled ? Colors.Grey100 : Colors.Grey800,
    letterSpacing: '0px'
  })
)

const InputWrapper = styled('div')(({ size }: { size: number }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': {
    fontSize: `${size}px`,
    fontWeight: 'bold',
    color: Colors.Grey800,
    letterSpacing: '0px'
  }
}))

const Input = styled('input')({
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  textAlign: 'center',
  minWidth: '38px',
  width: '38px',
  maxWidth: '100%',
  padding: '0px',
  paddingBottom: '1px',
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

const defaultFontSize = 64
const characterSpacing = 0.6
const characterWidth = 40
const maxAmountWidth = 160

export function calculateInputWidth(value: string) {
  const newWidth = value.length * characterWidth
  if (newWidth < maxAmountWidth) {
    return `${newWidth}px`
  } else {
    return `${maxAmountWidth}px`
  }
}

export const normalizeAmountInput = (
  value: string,
  context: Pick<ITipContext, 'maxAllowableTipAmountUsd'>,
  user?: User | null
) => {
  const { minTipLimitAmountUsd = 1 } = user?.tipSettings || {}

  // ensure that the input is a valid number input
  // remove any alphabet, special characters, leading zero, leading decimal
  const amountRegex = new RegExp(
    /(^[0])|([a-zA-Z\s])|([`.!@#$%^&*()_+\-=[\]{};':"\\|,<>/?])|/gm
  )
  value = value.replace(amountRegex, '')

  // strip the values from the thousandths place if it exists
  // doing this first so when the input display is set while typing it limits the user
  if (value.includes('.')) {
    if (value.split('.')[1].length > 2) {
      value = value.slice(0, -1)
    }
  }

  // set the value to max limit if input is greater
  if (Number(value) > context.maxAllowableTipAmountUsd) {
    value = context.maxAllowableTipAmountUsd.toString()
  }

  const displayValue = value

  // set the value to min limit if input is less
  if (Number(value) < minTipLimitAmountUsd) {
    value = minTipLimitAmountUsd.toString()
  }

  return { displayValue, value }
}

//
// Component
//
export const AmountInput = (): React.ReactElement => {
  const [displayFontSize, setDisplayFontSize] =
    useState<number>(defaultFontSize)

  const [isUserInput, setIsUserInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { user } = useStore()
  const { minTipLimitAmountUsd = 1 } = user?.tipSettings || {}
  const tipContext = useTip()
  const {
    currentTipAmountUsd,
    setCurrentTipAmountUsd,
    maxAllowableTipAmountUsd
  } = tipContext

  // validates the manual input and updates the state with the current amount
  // Masks input value to ensure only value entries are displayed.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    const normed = normalizeAmountInput(value, tipContext, user)
    value = normed.value

    // set the display value on the input for while the user is typing
    // setting before the min limit so the user can clear out the first digit
    if (inputRef.current) {
      inputRef.current.value = normed.displayValue
    }

    // Calculate and set the size of the input field based on the input
    e.target.style.width = calculateInputWidth(value)

    // update state for the actual current tip amount
    setCurrentTipAmountUsd(Number(value))
  }

  // updates the display font size in order to keep the font size within it's container
  const handleAdjustFontSize = (currentValue: number) => {
    let value: string

    // limit to two decimal places only
    if (currentValue % 1 != 0) {
      value = currentValue.toFixed(2)
    } else {
      value = currentValue.toString()
    }

    // calculate new font size
    let newFontSize = maxAmountWidth / value.length / characterSpacing
    if (newFontSize > defaultFontSize) {
      newFontSize = defaultFontSize
    }
    setDisplayFontSize(newFontSize)
  }

  // set focus to the input field when it loads. Cannot use 'autoFocus' because eslint-plugin-jsx-a11y
  useEffect(() => {
    if (isUserInput && inputRef.current) {
      inputRef.current.focus()
      // Make sure the input width is correct on focus.
      inputRef.current.style.width = `${
        currentTipAmountUsd.toString().length * characterWidth
      }px`
    }
  }, [isUserInput])

  // adjust the amount displayed font size
  useEffect(() => {
    handleAdjustFontSize(currentTipAmountUsd)
  }, [currentTipAmountUsd])

  return (
    <CurrentAmountWrapper>
      <IncDecButton type={IncDec.Dec} />
      {isUserInput ? (
        // render tip manual input
        <InputWrapper size={displayFontSize}>
          <span>$</span>
          <Input
            ref={inputRef}
            type='numerical'
            maxLength={10}
            size={1}
            placeholder={currentTipAmountUsd.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
            onBlur={() => setIsUserInput(false)}
          />
        </InputWrapper>
      ) : (
        // render tip display
        <Amount
          tabIndex={0}
          size={displayFontSize}
          onKeyPress={() => setIsUserInput(true)}
          onClick={() => setIsUserInput(true)}
          disabled={
            maxAllowableTipAmountUsd == 0 ||
            maxAllowableTipAmountUsd < minTipLimitAmountUsd
          }
        >
          $
          {Number.isInteger(currentTipAmountUsd)
            ? currentTipAmountUsd
            : currentTipAmountUsd.toFixed(2)}
        </Amount>
      )}
      <IncDecButton type={IncDec.Inc} />
    </CurrentAmountWrapper>
  )
}
