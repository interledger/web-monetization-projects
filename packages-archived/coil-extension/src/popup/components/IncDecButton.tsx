import React, { useState, useRef, useEffect } from 'react'
import { styled, SvgIcon, SvgIconProps } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { useStore } from '../context/storeContext'
import { useTip } from '../context/tipContext'

//
// Styles
//
const IncDecButtonWrapper = styled('button')({
  cursor: 'pointer',
  width: '32px',
  height: '32px',
  border: 'none',
  borderRadius: '32px',
  backgroundColor: 'transparent',
  color: Colors.Grey800,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: Colors.Violet10,
    color: Colors.Violet700
  },
  '&:active': {
    backgroundColor: Colors.Violet200,
    color: Colors.Violet700
  },
  '&:disabled': {
    backgroundColor: 'transparent',
    color: Colors.Grey100,
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

interface IIncDecButton {
  type: IncDec
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
export const IncDecButton = (props: IIncDecButton): React.ReactElement => {
  const { type } = props

  const { user } = useStore()
  const { minTipLimitAmountUsd = 1 } = user?.tipSettings || {}
  const {
    currentTipAmountUsd,
    setCurrentTipAmountUsd,
    maxAllowableTipAmountUsd
  } = useTip()

  const initialVelocity = 600
  const [velocity, setVelocity] = useState<number>(initialVelocity)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const updateAmount = () => {
    let amount = currentTipAmountUsd
    if (type === IncDec.Inc) {
      if (amount == maxAllowableTipAmountUsd) return
      amount = amount + 1
    } else if (type == IncDec.Dec) {
      amount = amount - 1
    }
    if (amount <= minTipLimitAmountUsd) {
      amount = minTipLimitAmountUsd
      stop()
    }
    if (amount >= maxAllowableTipAmountUsd) {
      amount = maxAllowableTipAmountUsd
      stop()
    }
    setCurrentTipAmountUsd(amount)
  }

  // Click logic
  const handleIncDecClick = () => {
    updateAmount()
  }

  //
  // Press and Hold logic
  //
  // Adjust the amount while button is pressed
  useInterval(
    () => {
      updateAmount()
    },
    isRunning ? velocity : null
  )

  // Adjust the velocity that the amount changes
  useInterval(
    () => {
      setVelocity((prev: number) => {
        let updatedVelocity = prev / 1.35

        if (prev === initialVelocity) {
          // this helps delay the first click
          updatedVelocity = prev / 3
        }
        if (updatedVelocity < 10) {
          // set the maximum velocity
          updatedVelocity = 10
        }

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
      return currentTipAmountUsd >= maxAllowableTipAmountUsd
    } else {
      return currentTipAmountUsd <= minTipLimitAmountUsd
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
