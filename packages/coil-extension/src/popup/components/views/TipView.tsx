/*
    TipView

    responsible for rendering the intial tip view for users to select the amount they would like to tip to the current site.
*/

// todo: Currently the AccountBar and WebMonetizedBar are done in the Index, need to extract those into a Layout component so views can handle their own layouts

import React from 'react'
import { styled, Box } from '@material-ui/core'
import { AmountInput } from '../AmountInput'
import { HotkeyAmountButtons } from '../HotkeyAmountButtons'
import { TipPaymentMethod } from '../TipPaymentMethod'
import { TipProcessStep, ITipView } from './TipRouter'
import { AccountBar } from '../AccountBar'
import { WebMonetizedBar } from '../WebMonetizedBar'
import { Colors } from '../../../shared-theme/colors'

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
    fontVariantNumeric: 'tabular-nums',
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
export const TipView = (props: ITipView): React.ReactElement => {
    const { 
        context, 
        currentTipAmount,
        setCurrentTipAmount,
        setTipProcessStep
    } = props

    const getRemainingDailyAmountAllowed = () => (100)  //! needs to be replaced with data from an api call to users settings

    const handleTip = () => {
        setTipProcessStep(TipProcessStep.TIP_COMPLETE)
    }

    return (
        <OuterDiv>
            <AccountBar context={context} />
            <ExtensionBodyWrapper>
                <Box mb='24px'textAlign='center' color={Colors.Grey800} fontWeight='normal' fontSize='18px' pt='5px' >
                    Donate to this site
                </Box>
                <AmountInput currentTipAmount={currentTipAmount} setCurrentTipAmount={setCurrentTipAmount}/>
                <Box m='12px 0px 34px 0px'>
                    <HotkeyAmountButtons setCurrentTipAmount={setCurrentTipAmount}/>
                </Box>
                <Box mb='5px'>
                    <TipPaymentMethod currentTipAmount={currentTipAmount} />
                </Box>
                <Button onClick={handleTip} disabled={currentTipAmount > getRemainingDailyAmountAllowed()}>Donate ${currentTipAmount}</Button>
            </ExtensionBodyWrapper>
            <WebMonetizedBar context={context} />
        </OuterDiv>
    )
}
