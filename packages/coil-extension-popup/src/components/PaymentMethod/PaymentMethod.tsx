import React from 'react'
import { styled } from '@material-ui/core'
import { useSelector, shallowEqual } from 'react-redux'
import { IRootState } from '@coil/extension-popup/redux/models'
import { Colors } from '@coil/extension-popup/theme'
import VisaLogo from '@coil/extension-popup/assets/images/creditcard-visa.svg'

//
// Styles
//
const PaymentMethodWrapper = styled('div')({
  fontWeight: 'normal',
  color: Colors.Grey700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
export const PaymentMethod = (): React.ReactElement => {
  const { tipCreditBalance, currentTipAmount } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  if (tipCreditBalance >= currentTipAmount) {
    return (
      <PaymentMethodWrapper>
        Use tip credits: ${tipCreditBalance}
      </PaymentMethodWrapper>
    )
  } else {
    return (
      <PaymentMethodWrapper>
        Pay with
        <CardInfo>
          <img src={VisaLogo} alt='visa icon' /> <Dot />
          <Dot />
          <Dot />
          <Dot />
          3455
        </CardInfo>
      </PaymentMethodWrapper>
    )
  }
}
