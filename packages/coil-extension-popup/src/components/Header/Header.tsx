import React from 'react'
import { styled, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Colors } from '@coil/extension-popup/theme'
import CoilIcon from '@coil/extension-popup/assets/images/coil-icon.svg'

//
// Styles
//
const HeaderWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '16px',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #e3e5e9',
  '& > *': {
    flexShrink: 0
  },
  '& > p': {
    flex: 1,
    margin: '2px 0px 0px 9px',
    color: Colors.Grey700
  }
})

const MenuButton = styled(IconButton)({
  padding: '0px',
  color: '#8f949f'
})

//
// Component
//
export const Header = (): React.ReactElement => {
  return (
    <HeaderWrapper>
      <img src={CoilIcon} alt='coil icon' />
      <p>Fabian Ruehle</p>
      <MenuButton
        onClick={() =>
          alert(
            'This button does not do anything in the prototype since it is irrelevant to what we are testing.'
          )
        }
      >
        <MoreVertIcon />
      </MenuButton>
    </HeaderWrapper>
  )
}
