import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { useStore } from '../context/storeContext'
import { useTip } from '../context/tipContext'
import { useRouter } from '../context/routerContext'
import { ROUTES } from '../contants'

import { TipProcessStep } from './views/TipRouter'

//
// Styles
//
const HotkeyButtonsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const HotkeyButton = styled('button')({
  cursor: 'pointer',
  border: 'none',
  borderRadius: '100px',
  backgroundColor: Colors.Violet10,
  color: Colors.Violet700,
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  textAlign: 'center',
  padding: '10px 0px',
  width: '54px',
  flex: '1',
  '&:hover': {
    backgroundColor: Colors.Violet400,
    color: '#FFFFFF'
  },
  '&:active': {
    backgroundColor: Colors.Violet700,
    color: '#FFFFFF'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey50,
    color: Colors.Grey100
  },
  '&:nth-child(2)': {
    margin: '0px 15px'
  }
})

//
// Component
//
export const HotkeyAmountButtons = (): React.ReactElement => {
  const router = useRouter()
  const { user } = useStore()
  const { hotkeyTipAmounts, remainingDailyAmount } = user?.tipSettings || {}
  const { setCurrentTipAmount } = useTip()

  const handleSelectAmount = (amount: number) => {
    setCurrentTipAmount(amount)
    router.to(ROUTES.tippingConfirm)
  }
  return (
    <HotkeyButtonsWrapper>
      {hotkeyTipAmounts.map((amount: number, index: number) => {
        return (
          <HotkeyButton
            key={`pdt-${index}`}
            disabled={amount > remainingDailyAmount}
            onClick={() => handleSelectAmount(amount)}
          >
            ${Number.isInteger(amount) ? amount : amount.toFixed(2)}
          </HotkeyButton>
        )
      })}
    </HotkeyButtonsWrapper>
  )
}
