import React, { useState } from 'react'
import { styled, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { motion } from 'framer-motion'

import { FitTextWrapper } from '../FitTextWrapper'
import { Colors } from '../../../shared-theme/colors'
import { TipPaymentDebits } from '../TipPaymentDebits'
import { InitiateTip, InitiateTipResult } from '../../../types/commands'
import { useStore } from '../../context/storeContext'
import { useHost } from '../../context/popupHostContext'

import { TipProcessStep, ITipView } from './TipRouter'

//
// Style
//
const ExtensionBodyWrapper = styled('div')({
  padding: '14px 24px 16px 24px',
  minHeight: '457px', // based on the first views body height to keep consistent
  maxHeight: '457px', // based on the first views body height to keep consistent
  background: 'linear-gradient(180deg, #FCFCFC 86.53%, #FFFFFF 97.24%)',
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
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#000000'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey500,
    color: Colors.Grey100
  }
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
  borderRadius: '10px',
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

const IconButton = styled('button')({
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  lineHeight: '0px',
  padding: '0px',
  marginRight: '-10px',
  color: Colors.Grey500,
  '&:hover': {
    color: Colors.Grey800
  }
})

//
// Component
//
export const TipConfirmView = (
  props: Omit<ITipView, 'setCurrentTipAmount'>
): React.ReactElement => {
  const { runtime } = useHost()
  const { user } = useStore()
  const { tipCreditBalance } = user?.tipSettings || {}
  const { currentTipAmount, setTipProcessStep } = props

  const [animateForward, setAnimateForward] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const getTipCreditCharge = (): number => {
    const creditBalance = tipCreditBalance || 0
    if (creditBalance >= currentTipAmount) {
      return currentTipAmount
    } else {
      return creditBalance
    }
  }

  const getCreditCardCharge = (): number => {
    const tipCreditCharge = getTipCreditCharge()
    if (currentTipAmount > tipCreditCharge) {
      const chargeAmount = currentTipAmount - tipCreditCharge
      return chargeAmount
    } else {
      return 0
    }
  }
  const tipCreditCharge = getTipCreditCharge()
  const creditCardCharge = getCreditCardCharge()

  const handleSubmit = async () => {
    setSubmitError(null)
    setIsSubmitting(true)

    //* currently the front end is responsible for splitting a tip between tipCredits and credit card */
    // TODO: move this logic to the backend - front end should simply send the tip amount
    // if the tipCreditAmount > 0
    // get the tip credits payment method id
    // submit a tip with credits
    // if it errors out -> fire off UI error
    // success -> continue

    // if the creditCardAmount > 0
    // get the credit card payment method id
    // submit a tip with credit card
    // if it errors out -> cancel tipCredit tip -> fire off UI error
    // success -> update to next step
    try {
      // get payment method ids
      const tipCreditPaymentMethodId = user?.paymentMethods?.find(
        method => method.type === 'tipCredit'
      )?.id
      const creditCardPaymentMethodId = user?.paymentMethods?.find(
        method => method.type === 'tipCredit'
      )?.id

      if (!tipCreditPaymentMethodId || !creditCardPaymentMethodId) {
        throw new Error('No payment method available')
      }

      // process payments
      const { success: tipCreditTipSuccess, id: tipCreditTipId } =
        await sendTip(tipCreditCharge, tipCreditPaymentMethodId)
      const { success: creditCardTipSuccess, id: creditCardTipId } =
        await sendTip(creditCardCharge, creditCardPaymentMethodId)

      if (tipCreditTipSuccess || creditCardTipSuccess) {
        setTipProcessStep(TipProcessStep.TIP_COMPLETE)
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
    setAnimateForward(false)
    setTipProcessStep(TipProcessStep.TIP)
  }

  const handleClose = () => {
    window.close()
  }

  const sendTip = async (tipAmount: number, paymentMethodId: string) => {
    const message: InitiateTip = {
      command: 'initiateTip',
      data: {
        amount: tipAmount,
        paymentMethodId
      }
    }

    return new Promise(resolve => {
      runtime.sendMessage(message, (result: InitiateTipResult) => {
        resolve(result)
      })
    }) as Promise<InitiateTipResult>
  }

  // Animation Settings
  const progressExitAnimation = {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.2
    }
  }

  const regressExitAnimation = {
    translateX: '308px',
    transition: {
      type: 'tween',
      duration: 0.5
    }
  }

  const bodyVariants = {
    hidden: {
      translateX: '308px'
    },
    visible: {
      translateX: '0px',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5
      }
    },
    exit: (custom: boolean) =>
      custom ? progressExitAnimation : regressExitAnimation
  }

  // Render
  return (
    <Box style={{ position: 'absolute', width: '100%' }}>
      <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        custom={animateForward}
        variants={bodyVariants}
        key='pending'
      >
        <ExtensionBodyWrapper>
          <Box textAlign='right' mb='42px'>
            <IconButton aria-label='Close' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            mb='24px'
            textAlign='center'
            color={Colors.Grey800}
            fontWeight='normal'
            fontSize='18px'
            pt='5px'
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
            mt='24px'
            textAlign='center'
            color={Colors.Grey800}
            fontWeight='normal'
            fontSize='18px'
            pt='5px'
          >
            Pay with
          </Box>
          <Box mt='10px' flex='1' display='flex'>
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : submitError ? 'Retry' : 'Confirm'}
          </Button>
          <CancelButton onClick={handleUndo} disabled={isSubmitting}>
            Cancel
          </CancelButton>
        </ExtensionBodyWrapper>
      </motion.div>
    </Box>
  )
}
