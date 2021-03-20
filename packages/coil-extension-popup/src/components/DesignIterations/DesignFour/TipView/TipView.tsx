import React from 'react'
import { styled, Box } from '@material-ui/core'
import {
  RecipientInfo,
  AmountInput,
  PredefinedButtons,
  PrimaryButton,
  PaymentMethod,
  Header,
  Footer
} from '@coil/extension-popup/components'
import { ProcessStep } from '@coil/extension-popup/types'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { IRootState } from '@coil/extension-popup/redux/models'
import * as actions from '@coil/extension-popup/redux/actions'
import { getRemainingDailyAmountAllowed } from '@coil/extension-popup/utils/get-amount-data.utils'

//
// Styles
//
const ExtensionBodyWrapper = styled('div')({
  padding: '24px 24px 16px 24px',
  minHeight: '352px' // based on the first views body height to keep consistent
  // display: 'flex',
  // flexDirection: 'column'
})

//
// Component
//
export const TipView = (): React.ReactElement => {
  const { currentTipAmount } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()

  const handleTip = () => {
    dispatch(actions.set_process_step(ProcessStep.Pending))
  }

  return (
    <>
      <Header />
      <ExtensionBodyWrapper>
        <Box mb='24px'>
          <RecipientInfo />
        </Box>
        <AmountInput />
        <Box m='12px 0px 34px 0px'>
          <PredefinedButtons />
        </Box>
        <Box mb='5px'>
          <PaymentMethod />
        </Box>
        <PrimaryButton
          onClick={handleTip}
          disabled={currentTipAmount > getRemainingDailyAmountAllowed()}
        >
          Donate ${currentTipAmount}
        </PrimaryButton>
      </ExtensionBodyWrapper>
      <Footer />
    </>
  )
}
