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
    let value = e.target.value ?? ''

    // ensure that the input is a valid number input
    // remove any alphabet or special characters
    value = value.replace(
      /(^\.)|([a-zA-Z\s])|([!@#$%^&*()_+\-=[\]{};':"\\|,<>/?])|(?<=\..*)\.|/gm,
      ''
    )

    // set the value to min limit if input is less
    if (Number(value) < minTipLimitAmountUsd) {
      value = minTipLimitAmountUsd.toString()
    }

    // set the value to max limit if input is greater
    if (Number(value) > maxAllowableTipAmountUsd) {
      value = maxAllowableTipAmountUsd.toString()
    }

    // strip the values from the thousandths place if it exists
    if (value.includes('.')) {
      if (value.split('.')[1].length > 2) {
        value = value.slice(0, -1)
      }
    }

    // Calculate and set the size of the input field based on the input
    const newWidth = value.length * 40
    if (newWidth < maxAmountWidth) {
      e.target.style.width = `${newWidth}px`
    } else {
      e.target.style.width = `${maxAmountWidth}px`
    }

    // set the display value on the input for while the user is typing
    inputRef.current.value = value
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
