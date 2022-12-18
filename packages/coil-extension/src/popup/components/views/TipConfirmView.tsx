import React, { useEffect, useState } from 'react'
import { styled, Box } from '@mui/material'

import { FitTextWrapper } from '../FitTextWrapper'
import { Colors } from '../../../shared-theme/colors'
import { TipPaymentDebits } from '../TipPaymentDebits'
import {
  Tip,
  TipResult,
  TipPreview,
  TipPreviewResult
} from '../../../types/commands'
import { useHost } from '../../context/popupHostContext'
import { useTip } from '../../context/tipContext'
import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../constants'
import { CtaButton } from '../CtaButton'
import { AnimateTippingOpacityWrapper } from '../page-animation-wrappers/AnimateTippingOpacityWrapper'

//
// Style
//
const ComponentWrapper = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 24px'
})

const CancelButton = styled('button')({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  width: '100%',
  height: '48px',
  backgroundColor: 'transparent',
  color: Colors.Grey500,
  border: 'none',
  borderRadius: '100px',
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  '&:hover': {
    color: Colors.Grey800
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: Colors.Grey100
  }
})

//
// Component
//
export const TipConfirmView = (): React.ReactElement => {
  const [tipCreditCharge, setTipCreditCharge] = useState(0)
  const [creditCardCharge, setCreditCardCharge] = useState(0)

  const { runtime } = useHost()

  const { currentTipAmountUsd, setFinalTipAmountUsd } = useTip()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const getTipQuotePromise = async (tipAmount: number) => {
    const message: TipPreview = {
      command: 'tipPreview',
      data: {
        amount: tipAmount
      }
    }
    return new Promise(resolve => {
      runtime.sendMessage(message, (result: TipPreviewResult) => {
        resolve(result)
      })
    }) as Promise<TipPreviewResult>
  }
  const getTipQuote = async (tipAmount: number) => {
    const tipQuote = await getTipQuotePromise(tipAmount)
    if (tipQuote.success) {
      setTipCreditCharge(Number(tipQuote.tipCreditCharge))
      setCreditCardCharge(Number(tipQuote.creditCardCharge))
    } else {
      router.to(ROUTES.tipping)
    }
  }

  const sendTip = async (tipAmount: number) => {
    const message: Tip = {
      command: 'tip',
      data: {
        amount: tipAmount
      }
    }

    return new Promise(resolve => {
      runtime.sendMessage(message, (result: TipResult) => {
        resolve(result)
      })
    }) as Promise<TipResult>
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      // setting the final tip amount first
      // this is done so that the tip context can properly update when storage is updated
      setFinalTipAmountUsd(currentTipAmountUsd)
      const { success, message } = await sendTip(currentTipAmountUsd)

      if (success) {
        router.to(ROUTES.tippingComplete)
      } else {
        const errorMsg = message ? message : 'Something went wrong'
        throw new Error(errorMsg)
      }
    } catch (error) {
      setSubmitError(error.message)
      setIsSubmitting(false)
    }
  }

  const handleUndo = () => {
    // reset to tip view
    router.to(ROUTES.tipping)
  }

  useEffect(() => {
    getTipQuote(currentTipAmountUsd)
  }, [currentTipAmountUsd])

  // Render
  return (
    <ComponentWrapper>
      <Box
        mt='59px'
        mb={2}
        textAlign='center'
        color={Colors.Grey800}
        fontWeight='normal'
        fontSize='18px'
      >
        {/* animate for sub navigation */}
        <AnimateTippingOpacityWrapper>
          You will send
        </AnimateTippingOpacityWrapper>
      </Box>
      <FitTextWrapper defaultFontSize={64}>
        $
        {Number.isInteger(currentTipAmountUsd)
          ? currentTipAmountUsd
          : currentTipAmountUsd.toFixed(2)}
      </FitTextWrapper>
      <Box flex='1' display='flex' flexDirection='column'>
        {/* animate for sub navigation */}
        <AnimateTippingOpacityWrapper>
          <Box
            mt={5}
            textAlign='center'
            color={Colors.Grey800}
            fontWeight='normal'
            fontSize='18px'
          >
            Pay with
          </Box>
          <Box mt={1} flex='1' display='flex'>
            {submitError ? (
              <Box
                width='100%'
                textAlign='center'
                color={Colors.Red400}
                alignSelf='center'
              >
                {submitError}
              </Box>
            ) : (
              <TipPaymentDebits
                tipCreditCharge={tipCreditCharge}
                creditCardCharge={creditCardCharge}
              />
            )}
          </Box>
        </AnimateTippingOpacityWrapper>
      </Box>
      <Box mt={1}>
        <CtaButton onClick={handleSubmit} disabled={isSubmitting}>
          {/* animate for sub navigation */}
          <AnimateTippingOpacityWrapper>
            {isSubmitting ? 'Sending...' : submitError ? 'Retry' : 'Confirm'}
          </AnimateTippingOpacityWrapper>
        </CtaButton>
      </Box>
      <Box mt={1} mb='14px'>
        {/* animate for sub navigation */}
        <AnimateTippingOpacityWrapper>
          <CancelButton onClick={handleUndo} disabled={isSubmitting}>
            Cancel
          </CancelButton>
        </AnimateTippingOpacityWrapper>
      </Box>
    </ComponentWrapper>
  )
}
