import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@coil/extension-popup/redux/models'
import * as actions from '@coil/extension-popup/redux/actions'
import { styled, Box } from '@material-ui/core'
import {
  RecipientInfo,
  PrimaryButton,
  PaymentDebits,
  Header,
  Footer
} from '@coil/extension-popup/components'
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
  letterSpacing: '0px',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '63px'
})

//
// Component
//
export const PendingView = (): React.ReactElement => {
  const { tipCreditBalance, currentTipAmount } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()

  let submitTimeout: NodeJS.Timeout
  useEffect(() => {
    submitTimeout = setTimeout(handleSubmit, 5000)
    return () => cleanUp()
  }, [])

  const cleanUp = () => {
    clearTimeout(submitTimeout)
    processPayments()
    //? should the transaction be submitted if the extension is closed before the 'undo' window is over?
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
    clearTimeout(submitTimeout)

    // reset current tip amount to default -- commented out per @Fabian
    // dispatch(actions.set_current_tip_amount(minimumTipLimit));

    // reset to tip view
    dispatch(actions.set_process_step(ProcessStep.Tip))
  }

  return (
    <>
      <Header />
      <ExtensionBodyWrapper>
        <Box mb='24px'>
          <RecipientInfo />
        </Box>
        <CurrentAmount>${currentTipAmount}</CurrentAmount>
        <Box mt='10px' flex='1'>
          <PaymentDebits />
        </Box>
        <PrimaryButton onClick={handleUndo} pendingState={true}>
          Undo
        </PrimaryButton>
      </ExtensionBodyWrapper>
      <Footer />
    </>
  )
}
