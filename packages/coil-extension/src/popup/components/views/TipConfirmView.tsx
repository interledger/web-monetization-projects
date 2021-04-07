import React from 'react'
import { styled, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { FitTextWrapper } from '../FitTextWrapper'
import { Colors } from '../../../shared-theme/colors'
import { TipPaymentDebits } from '../TipPaymentDebits'

import { TipProcessStep, ITipView } from './TipRouter'

//
// Style
//
const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

const ExtensionBodyWrapper = styled('div')({
  padding: '14px 24px 8px 24px',
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
  props: Omit<ITipView, 'context' | 'setCurrentTipAmount'>
): React.ReactElement => {
  const { currentTipAmount, setTipProcessStep } = props

  const handleSubmit = () => {
    // process payments

    // change slide
    setTipProcessStep(TipProcessStep.TIP_COMPLETE)
  }

  const handleUndo = () => {
    // reset to tip view
    setTipProcessStep(TipProcessStep.TIP)
  }

  const handleClose = () => {
    window.close()
  }

  return (
    <OuterDiv>
      <ExtensionBodyWrapper>
        <Box textAlign='right' mb='49px'>
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
        <Box mt='10px' flex='1'>
          <TipPaymentDebits currentTipAmount={currentTipAmount} />
        </Box>
        <Button onClick={handleSubmit}>Confirm</Button>
        <CancelButton onClick={handleUndo}>Cancel</CancelButton>
      </ExtensionBodyWrapper>
    </OuterDiv>
  )
}
