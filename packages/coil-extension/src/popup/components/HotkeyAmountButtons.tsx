import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '../../shared-theme/colors'

//
// Styles
//
const HotkeyButtonsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const HotkeyButton = styled('button')({
  cursor: 'pointer',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: Colors.Grey100,
  color: Colors.Grey500,
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  textAlign: 'center',
  padding: '10px 0px',
  width: '54px',
  '&:hover': {
    backgroundColor: Colors.Grey800,
    color: '#FFFFFF'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey50,
    color: Colors.Grey100,
  }
})

//
// Component
//
export const HotkeyAmountButtons = (props: {setCurrentTipAmount: (amount: number) => void}): React.ReactElement => {
  const { setCurrentTipAmount } = props;
  
  const maximumTipLimit = 100 //! needs to be replaced with data from an api call to users settings
  const getRemainingDailyAmountAllowed = () => (100)  //! needs to be replaced with data from an api call to users settings

  const handleSelectAmount = (amount: number) => {
    setCurrentTipAmount(amount)
  }
  return (
    <HotkeyButtonsWrapper>
      {
        [2,5,10,50].map((amount: number, index: number) => {   
          return(
            <HotkeyButton 
              key={`pdt-${index}`} 
              disabled={(amount > getRemainingDailyAmountAllowed() || amount > maximumTipLimit) ? true : false}
              onClick={() => handleSelectAmount(amount)}>
              ${amount}
            </HotkeyButton>
          )
        }) 
      }
    </HotkeyButtonsWrapper>
  )
}
