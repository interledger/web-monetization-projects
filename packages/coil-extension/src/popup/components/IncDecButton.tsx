import React, { useState, useRef, useEffect } from 'react'
import { styled, SvgIcon, SvgIconProps } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'

//
// Styles
//
const IncDecButtonWrapper = styled('button')({
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

//
// Icons
//

type SvgIconComponent = typeof SvgIcon

const IncButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
  return (
    <SvgIcon>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='7'
          y='10.75'
          width='10'
          height='2.5'
          rx='1.25'
          fill={props.htmlColor}
        />
        <rect
          x='13.2499'
          y='7'
          width='10'
          height='2.5'
          rx='1.25'
          transform='rotate(90 13.2499 7)'
          fill={props.htmlColor}
        />
      </svg>
    </SvgIcon>
  )
}

const DecButtonIcon: SvgIconComponent = (props: SvgIconProps) => {
  return (
    <SvgIcon>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='7'
          y='11'
          width='10'
          height='2.5'
          rx='1.25'
          fill={props.htmlColor}
        />
      </svg>
    </SvgIcon>
  )
}

//
// Models
//
export enum IncDec {
  Inc,
  Dec
}

//
// Utility
//

//* This "useInterval" was done because there are some side effects with setIntervals and rerendering from state
//* source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>()

  // Remember the latest function.
  useEffect(() => {
    if (savedCallback !== undefined) {
      savedCallback.current = callback
    }
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback !== undefined && savedCallback.current !== undefined) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

//
// Component
//
export const IncDecButton = (props: {
  type: IncDec
  currentTipAmount: number
  setCurrentTipAmount: (amount: number) => void
}): React.ReactElement => {
  const { type } = props
  const initialVelocity = 150
  const [velocity, setVelocity] = useState<number>(initialVelocity)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const minimumTipLimit = 1 //! needs to be replaced with data from an api call to users settings
  const maximumTipLimit = 100 //! needs to be replaced with data from an api call to users settings
  const getRemainingDailyAmountAllowed = () => 100 //! needs to be replaced with data from an api call to users settings

  const { currentTipAmount, setCurrentTipAmount } = props

  // Click logic
  const handleIncDecClick = () => {
    let amount = currentTipAmount
    if (type === IncDec.Inc) {
      if (amount == maximumTipLimit) return
      amount = amount + 1
    } else if (type == IncDec.Dec) {
      amount = amount - 1
    }
    if (isRunning) {
      return
    }
    setCurrentTipAmount(amount)
  }

  //
  // Press and Hold logic
  //
  // Adjust the amount while button is pressed
  useInterval(
    () => {
      let amount = currentTipAmount

      // handle increment/decrement
      if (type === IncDec.Inc) {
        if (amount == maximumTipLimit) return
        amount = amount + 1
      } else if (type == IncDec.Dec) {
        amount = amount - 1
      }

      // handle amount is below min or above max
      if (amount < minimumTipLimit) {
        amount = minimumTipLimit
        stop()
      }
      if (amount > getRemainingDailyAmountAllowed()) {
        amount = getRemainingDailyAmountAllowed()
        stop()
      }

      // perform update
      setCurrentTipAmount(amount)
    },
    isRunning ? velocity : null
  )

  // Adjust the velocity that the amount changes
  useInterval(
    () => {
      setVelocity((prev: number) => {
        let updatedVelocity = prev / 1.35
        if (updatedVelocity < 10) {
          // set the maximum velocity
          updatedVelocity = 10
        }
        console.log(`vel: ${updatedVelocity}`)
        return updatedVelocity
      })
    },
    isRunning ? 800 : null
  )

  const start = () => {
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
    setVelocity(initialVelocity)
  }

  const getDisabledState = () => {
    if (type == IncDec.Inc) {
      return !!(currentTipAmount >= getRemainingDailyAmountAllowed() ||
        currentTipAmount == maximumTipLimit)
    } else {
      return currentTipAmount <= minimumTipLimit
    }
  }

  return (
    <IncDecButtonWrapper
      disabled={getDisabledState()}
      onClick={handleIncDecClick}
      onMouseDown={start}
      onTouchStart={start}
      onMouseUp={stop}
      onTouchEnd={stop}
      onMouseLeave={stop}
    >
      {type == IncDec.Inc ? <IncButtonIcon /> : <DecButtonIcon />}
    </IncDecButtonWrapper>
  )
}
