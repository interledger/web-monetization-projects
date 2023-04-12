import React from 'react'
import { styled, Theme } from '@material-ui/core'

import { useStore } from '../context/storeContext'
import { useTip } from '../context/tipContext'

//
// Styles
//
const HotkeyButtonsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const HotkeyButton = styled('button')(
  ({ theme, active }: { theme: Theme; active: boolean }) => ({
    cursor: 'pointer',
    border: 'none',
    borderRadius: '100px',
    backgroundColor: active ? theme.palette.Violet700 : theme.palette.Violet10,
    color: active ? '#FFFFFF' : theme.palette.Violet700,
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
    fontSize: '16px',
    letterSpacing: '.5px',
    textAlign: 'center',
    padding: '10px 0px',
    width: '54px',
    flex: '1',
    '&:hover': {
      backgroundColor: active
        ? theme.palette.Violet700
        : theme.palette.Violet400,
      color: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: theme.palette.Violet700,
      color: '#FFFFFF'
    },
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.palette.Grey50,
      color: theme.palette.Grey100
    },
    '&:nth-child(2)': {
      margin: '0px 15px'
    }
  })
)

//
// Component
//
export const HotkeyAmountButtons = (): React.ReactElement => {
  const { user } = useStore()
  const { hotkeyTipAmountsUsd } = user?.tipSettings || {}
  const {
    setCurrentTipAmountUsd,
    maxAllowableTipAmountUsd,
    currentTipAmountUsd
  } = useTip()

  const handleSelectAmount = (amountUsd: number) => {
    setCurrentTipAmountUsd(amountUsd)
  }
  return (
    <HotkeyButtonsWrapper>
      {hotkeyTipAmountsUsd?.map((amountUsd: number, index: number) => {
        return (
          <HotkeyButton
            key={`pdt-${index}`}
            active={amountUsd === currentTipAmountUsd}
            disabled={amountUsd > maxAllowableTipAmountUsd}
            onClick={() => handleSelectAmount(amountUsd)}
          >
            ${Number.isInteger(amountUsd) ? amountUsd : amountUsd.toFixed(2)}
          </HotkeyButton>
        )
      })}
    </HotkeyButtonsWrapper>
  )
}
