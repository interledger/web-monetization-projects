import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '../../shared-theme/colors'
import { ITipView } from './views/TipRouter'

//
// Styles
//
const PaymentMethodWrapper = styled('div')({
    fontWeight: 'normal',
    color: Colors.Grey700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
  
  const CardInfo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img': {
      margin: '0px 6px'
    }
  })
  
  const Dot = styled('div')({
    backgroundColor: Colors.Grey700,
    width: '5px',
    height: '5px',
    borderRadius: '5px',
    marginRight: '2px',
    '&:last-of-type': {
      marginRight: '4px'
    }
  })

//
// Component
//
export const TipPaymentMethod = (props: {currentTipAmount: number}): React.ReactElement => {
    const { currentTipAmount } = props;

    const tipCreditBalance = 10 //! needs to be replaced with data from an api call to users settings

        if(tipCreditBalance >= currentTipAmount){
        return (<PaymentMethodWrapper>Use tip credits: ${tipCreditBalance}</PaymentMethodWrapper>)
        }
        else{
        return(
            <PaymentMethodWrapper>
                Pay with
                <CardInfo>
                    <img src='/res/creditcard-visa.svg' alt="visa icon" />
                    <Dot />
                    <Dot />
                    <Dot />
                    <Dot />
                    3455
                </CardInfo>
            </PaymentMethodWrapper>
        )
    }
}



