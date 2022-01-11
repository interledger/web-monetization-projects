import React from 'react'
import { styled, Box } from '@material-ui/core'
import { motion } from 'framer-motion'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { TipWarning } from '../TipWarning'
import { Colors } from '../../../shared-theme/colors'
import { useStore } from '../../context/storeContext'

import { TipProcessStep, ITipView } from './TipRouter'

//
// Styles
//
const ComponentWrapper = styled('div')({
  padding: '0px 24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})

const Button = styled('button')({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  width: '100%',
  height: '48px',
  backgroundColor: Colors.Grey800,
  color: '#FFFFFF',
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  border: 'none',
  borderRadius: '100px',
  '&:hover': {
    backgroundColor: '#000000'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey500,
    color: Colors.Grey100
  }
})

//
// Component
//
export const TipView: React.FC<ITipView> = (
  props: React.PropsWithChildren<ITipView>
) => {
  const { user } = useStore()
  const { hotkeyTipAmounts, remainingDailyAmount, minimumTipLimit } =
    user?.tipSettings || {}
  const { currentTipAmount, setCurrentTipAmount, setTipProcessStep } = props

  const handleTip = () => {
    setTipProcessStep(TipProcessStep.TIP_CONFIRM)
  }

  // Render
  return (
    <NewHeaderFooterLayout title='Support This Site'>
      <ComponentWrapper>
        <Box mt={6}>
          <AmountInput
            currentTipAmount={currentTipAmount}
            setCurrentTipAmount={setCurrentTipAmount}
            remainingDailyAmount={remainingDailyAmount || 0}
            minimumTipLimit={minimumTipLimit || 1}
          />
        </Box>
        <Box mt={5}>
          <HotkeyAmountButtons
            hotkeyTipAmounts={hotkeyTipAmounts || []}
            remainingDailyAmount={remainingDailyAmount || 0}
            setCurrentTipAmount={setCurrentTipAmount}
            setTipProcessStep={setTipProcessStep}
          />
        </Box>
        <Box mt={4} flex='1'>
          <TipWarning
            currentTipAmount={currentTipAmount}
            remainingDailyAmount={remainingDailyAmount || 0}
          />
        </Box>
        <Box mb={2}>
          <Button
            onClick={handleTip}
            disabled={currentTipAmount > (remainingDailyAmount || 0)}
          >
            Send $
            {Number.isInteger(currentTipAmount)
              ? currentTipAmount
              : currentTipAmount.toFixed(2)}
          </Button>
        </Box>
      </ComponentWrapper>
    </NewHeaderFooterLayout>
  )
}
