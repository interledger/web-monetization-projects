/*
    TipView

    responsible for rendering the intial tip view for users to select the amount they would like to tip to the current site.
*/

// todo: Currently the AccountBar and WebMonetizedBar are done in the Index, need to extract those into a Layout component so views can handle their own layouts

import React from 'react'
import { styled, Box } from '@material-ui/core'

import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { AccountBar } from '../AccountBar'
import { WebMonetizedBar } from '../WebMonetizedBar'
import { TipWarning } from '../TipWarning'
import { Colors } from '../../../shared-theme/colors'

import { TipProcessStep, ITipView } from './TipRouter'

//
// Styles
//
const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

const ExtensionBodyWrapper = styled('div')({
  padding: '24px 24px 16px 24px',
  minHeight: '352px', // based on the first views body height to keep consistent
  background: 'linear-gradient(180deg, #FCFCFC 86.53%, #FFFFFF 97.24%)'
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

//
// Component
//
export const TipView: React.FC<ITipView> = (
  props: React.PropsWithChildren<ITipView>
) => {
  const {
    context,
    currentTipAmount,
    setCurrentTipAmount,
    setTipProcessStep
  } = props

  const hotkeyTipAmounts = context.store.user.tipSettings?.hotkeyTipAmounts
  const remainingDailyAmount =
    context.store.user.tipSettings?.remainingDailyAmount
  const minimumTipLimit = context.store.user.tipSettings?.minimumTipLimit

  const handleTip = () => {
    setTipProcessStep(TipProcessStep.TIP_CONFIRM)
  }

  return (
    <OuterDiv>
      <AccountBar context={context} />
      <ExtensionBodyWrapper>
        <Box
          mb='24px'
          textAlign='center'
          color={Colors.Grey800}
          fontWeight='normal'
          fontSize='18px'
          pt='5px'
        >
          Support to this site
        </Box>
        <AmountInput
          currentTipAmount={currentTipAmount}
          setCurrentTipAmount={setCurrentTipAmount}
          remainingDailyAmount={remainingDailyAmount || 0}
          minimumTipLimit={minimumTipLimit || 1}
        />
        <Box m='20px 0px 35px 0px'>
          <HotkeyAmountButtons
            hotkeyTipAmounts={hotkeyTipAmounts || []}
            remainingDailyAmount={remainingDailyAmount || 0}
            setCurrentTipAmount={setCurrentTipAmount}
            setTipProcessStep={setTipProcessStep}
          />
        </Box>
        <Box mb='35px'>
          <TipWarning
            currentTipAmount={currentTipAmount}
            remainingDailyAmount={remainingDailyAmount || 0}
          />
        </Box>
        <Button
          onClick={handleTip}
          disabled={currentTipAmount > (remainingDailyAmount || 0)}
        >
          Send $
          {Number.isInteger(currentTipAmount)
            ? currentTipAmount
            : currentTipAmount.toFixed(2)}
        </Button>
      </ExtensionBodyWrapper>
      <WebMonetizedBar context={context} />
    </OuterDiv>
  )
}
