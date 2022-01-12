import React from 'react'
import { styled, Box } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { Colors } from '../../../shared-theme/colors'
import { useStore } from '../../context/storeContext'
import { useTip } from '../../context/tipContext'
import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../constants'
import { TipAmountFeedback } from '../TipAmountFeedback'

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
export const TipView: React.FC = () => {
  const { user } = useStore()
  const { remainingDailyAmount } = user?.tipSettings || {}
  const { currentTipAmount } = useTip()
  const router = useRouter()

  const handleTip = () => {
    router.to(ROUTES.tippingConfirm)
  }

  // Render
  return (
    <NewHeaderFooterLayout title='Support This Site'>
      <ComponentWrapper>
        <Box mt={6}>
          <AmountInput />
        </Box>
        <Box mt={5}>
          <HotkeyAmountButtons />
        </Box>
        <Box mt={4} mb={1} flex='1'>
          <TipAmountFeedback />
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
