import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '../../shared-theme/colors'

//
// Styles
//
const PaymentDebitsWrapper = styled('div')({
    // flex: '1',
    // paddingTop: '10px'
  })
  
  const PaymentDebit = styled('div')({
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: Colors.Grey700,
    fontWeight: 'normal'
  })
  
  const PaymentMethod = styled('div')({
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      marginRight: '8px'
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
export const TipPaymentDebits = (props: {currentTipAmount: number}): React.ReactElement => {
    const { currentTipAmount } = props;
    
    const tipCreditBalance = 10 //! needs to be replaced with data from an api call to users settings

    const getTipCreditCharge = (): number => {
        if (tipCreditBalance >= currentTipAmount) {
            return currentTipAmount
        } else {
            return tipCreditBalance
        }
    }

    const getCreditCardCharge = (): number => {
        if (currentTipAmount > getTipCreditCharge()) {
            const chargeAmount = currentTipAmount - getTipCreditCharge()
            return chargeAmount
        } else {
            return 0
        }
    }

    return(
        <PaymentDebitsWrapper>
            {getTipCreditCharge() > 0 && ( // show the tip credits only if they have been charged
            <PaymentDebit>
                <PaymentMethod>
                    <img src='/res/CoilLogo.svg' alt="coil icon" /> Tip credits
                </PaymentMethod>
                <div>-${getTipCreditCharge().toFixed(2)}</div>
            </PaymentDebit>
            )}
            {getCreditCardCharge() > 0 && ( // show the credit card only if it has been charged
            <PaymentDebit>
                <PaymentMethod>
                    <img src='/res/creditcard-visa.svg' alt="credit card icon" /> <Dot />
                    <Dot />
                    <Dot />
                    <Dot />
                    3455
                </PaymentMethod>
                <div>-${getCreditCardCharge().toFixed(2)}</div>
            </PaymentDebit>
            )}
        </PaymentDebitsWrapper>
    )
}