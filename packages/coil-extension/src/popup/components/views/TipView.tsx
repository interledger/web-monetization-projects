import React, { useEffect } from 'react'
import { styled, Box } from '@material-ui/core'

import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { useTip } from '../../context/tipContext'
import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../constants'
import { TipAmountFeedback } from '../TipAmountFeedback'
import { CtaButton } from '../CtaButton'
import { useStore } from '../../context/storeContext'
import { useHost } from '../../context/popupHostContext'
import { UpdateTippingSettings } from '../../../types/commands'
import { AnimatePageTransitionWrapper } from '../page-animation-wrappers/AnimatePageTransitionWrapper'
import { AnimateTippingHeaderWrapper } from '../page-animation-wrappers/AnimateTippingHeaderWrapper'
import { AnimateTippingNavBarWrapper } from '../page-animation-wrappers/AnimateTippingNavBarWrapper'
import { AnimateTippingOpacityWrapper } from '../page-animation-wrappers/AnimateTippingOpacityWrapper'
import { Header } from '../Header'
import { NavBar } from '../NavBar'

//
// Styles
//
const ComponentWrapper = styled('div')({
  padding: '0px 24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})

const FlexContainer = styled(`div`)({
  flex: '1',
  display: 'flex',
  flexDirection: 'column'
})

//
// Component
//
export const TipView: React.FC = () => {
  const { currentTipAmountUsd, maxAllowableTipAmountUsd } = useTip()
  const { user } = useStore()
  const router = useRouter()
  const { runtime } = useHost()

  const { tipSettings: { minTipLimitAmountUsd = 1 } = {} } = user ?? {}

  const updateTipSettings = () => {
    const message: UpdateTippingSettings = {
      command: 'updateTippingSettings'
    }
    runtime.sendMessage(message)
  }

  const handleTip = () => {
    router.to(ROUTES.tippingConfirm)
  }

  const buttonDisabled =
    currentTipAmountUsd < minTipLimitAmountUsd ||
    currentTipAmountUsd > maxAllowableTipAmountUsd ||
    currentTipAmountUsd == 0 ||
    maxAllowableTipAmountUsd == 0

  useEffect(() => {
    updateTipSettings()
  }, [])

  // Render
  return (
    <FlexContainer>
      {/* animating header for primary and sub navigation */}
      <AnimateTippingHeaderWrapper>
        <Header>
          <AnimatePageTransitionWrapper>
            Tip This Site
          </AnimatePageTransitionWrapper>
        </Header>
      </AnimateTippingHeaderWrapper>
      {/* animate body for primary and sub navigation */}
      <AnimatePageTransitionWrapper>
        <ComponentWrapper>
          <Box mt={6}>
            <AmountInput />
          </Box>
          <Box mt={5}>
            {/* animate body for primary and sub navigation */}
            <AnimateTippingOpacityWrapper>
              <HotkeyAmountButtons />
            </AnimateTippingOpacityWrapper>
          </Box>
          <Box mt={4} mb={1} flex='1'>
            {/* animate body for primary and sub navigation */}
            <AnimateTippingOpacityWrapper>
              <TipAmountFeedback />
            </AnimateTippingOpacityWrapper>
          </Box>
          <Box mb={1}>
            <CtaButton onClick={handleTip} disabled={buttonDisabled}>
              {/* animate body for primary and sub navigation */}
              <AnimateTippingOpacityWrapper>
                Send $
                {Number.isInteger(currentTipAmountUsd)
                  ? currentTipAmountUsd
                  : currentTipAmountUsd.toFixed(2)}
              </AnimateTippingOpacityWrapper>
            </CtaButton>
          </Box>
        </ComponentWrapper>
      </AnimatePageTransitionWrapper>
      {/* animate navbar for sub navigation - does not need to animate for primary navigation */}
      <AnimateTippingNavBarWrapper>
        <NavBar />
      </AnimateTippingNavBarWrapper>
    </FlexContainer>
  )
}
