import React, { useEffect } from 'react'
import { styled, Box } from '@material-ui/core'
import { motion, AnimatePresence } from 'framer-motion'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
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

  const variants = {
    initial: {
      opacity: 0,
      x: 0
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1]
      }
    },
    exit: {
      opacity: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1]
      }
    }
  }

  // Render
  return (
    <NewHeaderFooterLayout title='Tip This Site'>
      <motion.div
        key='tip-view'
        initial='initial'
        animate='enter'
        exit='exit'
        variants={variants}
      >
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
      </motion.div>
    </NewHeaderFooterLayout>
  )
}
