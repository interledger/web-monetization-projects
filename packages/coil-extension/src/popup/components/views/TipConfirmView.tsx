import React, { useEffect, useState } from 'react'
import { styled, Box } from '@material-ui/core'

import { Header } from '../Header'
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

  const { currentTipAmount } = useTip()
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
    setTipCreditCharge(Number(tipQuote.tipCreditCharge))
    setCreditCardCharge(Number(tipQuote.creditCardCharge))
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
    // router.to(ROUTES.tippingComplete)

    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const { success } = await sendTip(currentTipAmount)

      if (success) {
        router.to(ROUTES.tippingComplete)
      } else {
        throw new Error('Something went wrong')
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
    getTipQuote(currentTipAmount)
  }, [currentTipAmount])

  // Render
  return (
    <>
      <Header />
      <ComponentWrapper>
        <Box
          mt='9px'
          mb={2}
          textAlign='center'
          color={Colors.Grey800}
          fontWeight='normal'
          fontSize='18px'
        >
          You will send
        </Box>
        <FitTextWrapper defaultFontSize={64}>
          $
          {Number.isInteger(currentTipAmount)
            ? currentTipAmount
            : currentTipAmount.toFixed(2)}
        </FitTextWrapper>
        <Box
          mt={5}
          textAlign='center'
          color={Colors.Grey800}
          fontWeight='normal'
          fontSize='18px'
        >
          Pay with
        </Box>
        <Box mt={2} flex='1' display='flex'>
          {submitError ? (
            <Box
              width='100%'
              textAlign='center'
              color={Colors.Red400}
              alignSelf='center'
            >
              Something went wrong.
            </Box>
          ) : (
            <TipPaymentDebits
              tipCreditCharge={tipCreditCharge}
              creditCardCharge={creditCardCharge}
            />
          )}
        </Box>
        <Box mt={1}>
          <CtaButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : submitError ? 'Retry' : 'Confirm'}
          </CtaButton>
        </Box>
        <Box mt='10px' mb='20px'>
          <CancelButton onClick={handleUndo} disabled={isSubmitting}>
            Cancel
          </CancelButton>
        </Box>
      </ComponentWrapper>
    </>
  )
}
