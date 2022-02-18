import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { useStore } from '../context/storeContext'
import { useTip } from '../context/tipContext'

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

//
// Component
//
export const AmountInput = (): React.ReactElement => {
  const defaultFontSize = 64
  const characterSpacing = 0.6
  const maxAmountWidth = 160
  const [displayFontSize, setDisplayFontSize] =
    useState<number>(defaultFontSize)

  const [isUserInput, setIsUserInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { user } = useStore()
  const { minTipLimitAmountUsd = 1 } = user?.tipSettings || {}
  const {
    currentTipAmountUsd,
    setCurrentTipAmountUsd,
    maxAllowableTipAmountUsd
  } = useTip()

  // validates the manual input and updates the state with the current amount
  // Masks input value to ensure only value entries are displayed.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let containsDecimal = false // used to calculate the input field size

    // ensure that the input is a valid number input
    // remove any alphabet or special characters
    value = value.replace(
      /([a-zA-Z\s])|([!@#$%^&*()_+\-=[\]{};':"\\|,<>/?])|(?<=\..*)\.|/gm,
      ''
    )

    // strip the values from the thousandths place if it exists
    // note: we are not rounding because it feels weird when the user hits the next key
    // setting 'containsDecimal' so we can calculate the container width including the decimal
    // doing this here because once we change from string to number we lose the proper character count
    // this is all done for the instances when someone is in the process of typing a fractional amount and the last character was the '.'
    if (value.includes('.')) {
      containsDecimal = true
      if (value.split('.')[1].length > 2) {
        value = value.slice(0, -1)
      }
    }

    // set the value that the user sees while typing
    inputRef.current.value = value

    // everything after this point is used to set the actual value
    // that will be displayed once the field is no longer in focus
    // and so the input field expands to the correct size while typing

    // handle if the value is below the minimum
    value = Number(value)
    if (Number(value) < minTipLimitAmountUsd) {
      value = minTipLimitAmountUsd
      if (isUserInput && inputRef.current) {
        // if the user inputs an amount below the min, immediately update the input
        inputRef.current.value = value.toString()
      }
    }

    // handle if the input is higher than the remaining daily limit
    if (Number(value) > maxAllowableTipAmountUsd) {
      value = maxAllowableTipAmountUsd
      if (isUserInput && inputRef.current) {
        // if the user inputs an amount above  the max, immediately update the input
        inputRef.current.value = value.toString()
      }
    }

    // Calculate and set the size of the input field based on the input
    let valueLength: number
    if (containsDecimal) {
      // set the value length if it is a decimal number
      // calculate with an additional characters if there is a trailing period
      valueLength = value.toFixed(2).length
    } else {
      valueLength = value.toString().length
    }

    const newWidth = valueLength * 40
    if (newWidth < maxAmountWidth) {
      e.target.style.width = `${newWidth}px`
    } else {
      e.target.style.width = `${maxAmountWidth}px`
    }

    // update state for the actual current tip amount
    setCurrentTipAmountUsd(value)
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
        currentTipAmountUsd.toString().length * 40
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
          size={displayFontSize}
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
