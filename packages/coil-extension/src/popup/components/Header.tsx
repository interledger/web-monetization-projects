import React from 'react'
import { styled, Theme } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { CoilLogo } from './icons/CoilLogo'

//
// Styles
//
const HeaderContainer = styled('div')({
  display: 'flex',
  padding: '13px 18px'
})
const HeaderTitle = styled('div')(({ theme }: Theme) => ({
  flex: '1',
  textAlign: 'center',
  color: theme.palette.Grey800
}))
const CloseButton = styled('button')(({ theme }: Theme) => ({
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0',
  color: theme.palette.Grey200,
  '&:hover': {
    color: theme.palette.Grey500
  }
}))

//
// Component
//
export const Header: React.FC = props => {
  return (
    <HeaderContainer>
      <CoilLogo />
      <HeaderTitle>{props.children}</HeaderTitle>
      <CloseButton>
        <CloseRoundedIcon />
      </CloseButton>
    </HeaderContainer>
  )
}
