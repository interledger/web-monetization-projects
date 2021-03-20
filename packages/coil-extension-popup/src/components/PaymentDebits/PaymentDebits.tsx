import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '@coil/extension-popup/theme'
import CoilIcon from '@coil/extension-popup/assets/images/coil-icon.svg'
import VisaIcon from '@coil/extension-popup/assets/images/creditcard-visa.svg'
import {
  getTipCreditCharge,
  getCreditCardCharge
} from '@coil/extension-popup/utils/get-amount-data.utils'

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
export const PaymentDebits = (): React.ReactElement => {
  return (
    <PaymentDebitsWrapper>
      {getTipCreditCharge() > 0 && ( // show the tip credits only if they have been charged
        <PaymentDebit>
          <PaymentMethod>
            <img src={CoilIcon} alt='coil icon' /> Tip credits
          </PaymentMethod>
          <div>-${getTipCreditCharge().toFixed(2)}</div>
        </PaymentDebit>
      )}
      {getCreditCardCharge() > 0 && ( // show the credit card only if it has been charged
        <PaymentDebit>
          <PaymentMethod>
            <img src={VisaIcon} alt='coil icon' /> <Dot />
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
