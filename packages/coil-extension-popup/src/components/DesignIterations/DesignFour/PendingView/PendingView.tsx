import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@coil/extension-popup/redux/models'
import * as actions from '@coil/extension-popup/redux/actions'
import { styled, Box, makeStyles } from '@material-ui/core'
import { PaymentDebits, Header, Footer } from '@coil/extension-popup/components'
import { Colors } from '@coil/extension-popup/theme'
import { ProcessStep } from '@coil/extension-popup/types'
import {
  getTipCreditCharge,
  getCreditCardCharge
} from '@coil/extension-popup/utils/get-amount-data.utils'

//
// Style
//
const ExtensionBodyWrapper = styled('div')({
  padding: '24px 24px 16px 24px',
  minHeight: '352px', // based on the first views body height to keep consistent
  display: 'flex',
  flexDirection: 'column'
})

const CurrentAmount = styled('div')({
  height: '68px',
  color: Colors.Grey800,
  textAlign: 'center',
  fontSize: '64px',
  fontWeight: 'bold',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0px',
  lineHeight: '63px'
})

const Button = styled('button')({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  width: '100%',
  height: '48px',
  backgroundColor: '#E3E5E9',
  color: Colors.Grey500,
  border: 'none',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: 'CircularStd',
  '&:hover': {
    backgroundColor: '#d4d6da'
  }
})

const ProgressBar = styled('div')({
  position: 'relative',
  width: '100%',
  height: '4px',
  backgroundColor: 'rgba(52, 122, 246, .1)',
  borderRadius: '4px',
  overflow: 'hidden'
})

const Fill = styled('div')({
  position: 'absolute',
  zIndex: 8,
  width: '0%',
  top: 0,
  bottom: 0,
  left: 0,
  backgroundColor: Colors.Blue400
})

//* cannot get the keyframes to work with 'styled' syntax
const useStyles = makeStyles({
  fill: {
    animation: `$fill 5s linear`
  },
  '@keyframes fill': {
    from: { width: '100%' },
    to: { width: '0%' }
  }
})

//
// Component
//
export const PendingView = (): React.ReactElement => {
  const [timeRemaining, setTimeRemaining] = useState<number>(5)
  const { tipCreditBalance, currentTipAmount } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()
  const classes = useStyles()

  // auto proceed timeout
  let submitTimeout: NodeJS.Timeout
  useEffect(() => {
    submitTimeout = setTimeout(handleSubmit, 5000)
    return () => cleanUp()
  }, [])

  const cleanUp = () => {
    console.log('clean')
    clearTimeout(submitTimeout)
    processPayments()
    //? should the transaction be submitted if the extension is closed before the 'undo' window is over?
  }

  // countdown interval
  let countdownInterval: NodeJS.Timeout
  useEffect(() => {
    countdownInterval = setInterval(updateCoundown, 1000)
    return () => clearInterval(countdownInterval)
  }, [timeRemaining])

  const updateCoundown = () => {
    setTimeRemaining(timeRemaining - 1)
  }

  const processPayments = () => {
    // submit charges here
    console.log(`charge credit card: ${getCreditCardCharge()}`)
  }

  const processTipDebit = () => {
    // update tip credit balance
    const tipDebit = getTipCreditCharge()
    console.log(`debit tip balance: ${tipDebit}`)
    console.log(`debit credit balance: ${tipCreditBalance}`)
    dispatch(actions.set_tip_credit_balance(tipCreditBalance - tipDebit))
  }

  const handleSubmit = () => {
    // process payments
    processPayments()
    processTipDebit()

    // add amount tip to history
    dispatch(actions.add_tip_to_history(currentTipAmount))

    // change slide
    dispatch(actions.set_process_step(ProcessStep.Complete))
  }

  const handleUndo = () => {
    //? should "undo" simply reset the form and not make the payment?
    //? or should "undo" close out the extension? - would need to refactor cleanup

    // clear timeout
    // clearTimeout(submitTimeout)

    // reset current tip amount to default -- commented out per @Fabian
    // dispatch(actions.set_current_tip_amount(minimumTipLimit));

    // reset to tip view
    dispatch(actions.set_process_step(ProcessStep.Tip))
  }

  return (
    <>
      <Header />
      <ExtensionBodyWrapper>
        <Box mb='32px'>
          <Box mb='10px' color={Colors.Blue400} textAlign='center'>
            Sending in {timeRemaining}s
          </Box>
          <ProgressBar>
            <Fill className={classes.fill} />
          </ProgressBar>
        </Box>
        <CurrentAmount>${currentTipAmount}</CurrentAmount>
        <Box mt='10px' flex='1'>
          <PaymentDebits />
        </Box>
        <Button onClick={handleUndo}>Cancel</Button>
      </ExtensionBodyWrapper>
      <Footer />
    </>
  )
}
