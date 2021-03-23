import React, { useState, useRef, useEffect } from 'react'
import { styled, SvgIcon, SvgIconProps } from '@material-ui/core'
import { Colors } from '../../shared-theme/colors'
import { ITipView } from './views/TipRouter'

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
// Icons
//

type SvgIconComponent = typeof SvgIcon

const IncButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
  return (
    <SvgIcon>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="10.75" width="10" height="2.5" rx="1.25" fill={props.htmlColor} />
        <rect
          x="13.2499"
          y="7"
          width="10"
          height="2.5"
          rx="1.25"
          transform="rotate(90 13.2499 7)"
          fill={props.htmlColor}
        />
      </svg>
    </SvgIcon>
  )
}

const DecButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
    return (
      <SvgIcon>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="11" width="10" height="2.5" rx="1.25" fill={props.htmlColor} />
        </svg>
      </SvgIcon>
    )
  }

//
// Component
//
export const AmountInput = ( props: Omit<ITipView, 'context' | 'setTipProcessStep'>): React.ReactElement => {
  const [isUserInput, setIsUserInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const minimumTipLimit = 1 //! needs to be replaced with data from an api call to users settings
  const maximumTipLimit = 100 //! needs to be replaced with data from an api call to users settings
  const getRemainingDailyAmountAllowed = () => (100)  //! needs to be replaced with data from an api call to users settings

  const { 
    currentTipAmount,
    setCurrentTipAmount,
} = props 

  // set focus to the input field when it loads. Cannot use 'autoFocus' because eslint-plugin-jsx-a11y
  useEffect(() => {
    if (isUserInput && inputRef.current) {
      inputRef.current.focus()

      // Make sure the input width is correct on focus.
      inputRef.current.style.width = `${currentTipAmount.toString().length * 40}px`

    }
  }, [isUserInput])

  const handleIncDecClick = (type: IncDec) => {
    let amount = currentTipAmount
    if (type === IncDec.Inc) {
      if(amount == maximumTipLimit) return;
      amount = amount + 1
    } else if (type == IncDec.Dec) {
      amount = amount - 1
    }
    setCurrentTipAmount(amount)
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
    if(value > maximumTipLimit){
      value = maximumTipLimit;
      if (isUserInput && inputRef.current) {
        inputRef.current.value = value.toString()
      }
    }

    // handle if the input is higher than the remaining daily limit
    if( value > getRemainingDailyAmountAllowed()){
      value = getRemainingDailyAmountAllowed();
      if (isUserInput && inputRef.current) {
        inputRef.current.value = value.toString()
      }
    }

    // set input box size
    // NB that this is done after masking.
    e.target.style.width = `${e.target.value.length * 40}px`

    // update state
    setCurrentTipAmount(value);
  }

  return (
    <div>
      <CurrentAmountWrapper>
        <IncDecButton
          disabled={currentTipAmount <= minimumTipLimit ? true : false}
          onClick={() => handleIncDecClick(IncDec.Dec)}>
          <DecButtonIcon />
        </IncDecButton>
        {isUserInput ? (
          // render tip manual input
          <InputWrapper>
            <span>$</span>
            <Input
              ref={inputRef}
              type="numerical"
              maxLength={4}
              size={1}
              placeholder={currentTipAmount.toString()}
              onChange={(e) => handleInputChange(e)}
              onBlur={() => setIsUserInput(false)}
            />
          </InputWrapper>
        ) : (
          // render tip display
          <Amount onClick={() => setIsUserInput(true)}>${currentTipAmount}</Amount>
        )}
        <IncDecButton 
          disabled={ (currentTipAmount >= getRemainingDailyAmountAllowed() || currentTipAmount == maximumTipLimit) ? true : false }
          onClick={() => handleIncDecClick(IncDec.Inc)}>
          <IncButtonIcon />
        </IncDecButton>
      </CurrentAmountWrapper>
      <WarningWrapper>
        {
          currentTipAmount >= getRemainingDailyAmountAllowed() 
            ? <span>Daily tipping limit reached </span>
            : currentTipAmount == maximumTipLimit
              ? <span>Maximum amount for tip</span>
              : null
        }
      </WarningWrapper>
    </div>
  )
}
