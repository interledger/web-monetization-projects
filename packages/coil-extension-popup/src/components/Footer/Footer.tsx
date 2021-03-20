import React from 'react'
import { styled } from '@material-ui/core'
import { Colors } from '@coil/extension-popup/theme'
import MonetizedIcon from '@coil/extension-popup/assets/images/monetized-icon.svg'

//
// Styles
//
const FooterWrapper = styled('div')({
  display: 'flex',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  color: Colors.Grey800,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '13px 24px 10px 24px',
  borderTop: '1px solid #e3e5e9',
  '& > img': {
    width: '13px',
    height: 'auto',
    marginRight: '6px'
  }
})

//
// Component
//
export const Footer = (): React.ReactElement => {
  return (
    <FooterWrapper
      onClick={() =>
        alert(
          'This button does not do anything in the prototype since it is irrelevant to what we are testing.'
        )
      }
    >
      <img src={MonetizedIcon} alt='monetized site icon' />
      <span>This site is web monetized</span>
    </FooterWrapper>
  )
}
