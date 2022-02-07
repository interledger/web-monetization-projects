import React from 'react'
import { styled, Box } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { useTip } from '../../context/tipContext'
import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../constants'
import { TipAmountFeedback } from '../TipAmountFeedback'
import { CtaButton } from '../CtaButton'

//
// Styles
//
const ComponentWrapper = styled('div')({
  padding: '0px 24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})

//
// Component
//
export const TipView: React.FC = () => {
  const { currentTipAmountUsd, maxAllowableTipAmountUsd } = useTip()
  const router = useRouter()

  const handleTip = () => {
    router.to(ROUTES.tippingConfirm)
  }

  const buttonDisabled =
    currentTipAmountUsd > maxAllowableTipAmountUsd ||
    currentTipAmountUsd == 0 ||
    maxAllowableTipAmountUsd == 0

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
        <Box mb={1}>
          <CtaButton onClick={handleTip} disabled={buttonDisabled}>
            Send $
            {Number.isInteger(currentTipAmountUsd)
              ? currentTipAmountUsd
              : currentTipAmountUsd.toFixed(2)}
          </CtaButton>
        </Box>
      </ComponentWrapper>
    </NewHeaderFooterLayout>
  )
}
