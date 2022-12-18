import React from 'react'
import { styled, Theme } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { CoilLogo } from './icons/CoilLogo'

//
// Styles
//
const HeaderContainer = styled('div')({
  display: 'flex',
  padding: '13px 18px'
})
const HeaderTitle = styled('div')(({ theme }) => ({
  flex: '1',
  textAlign: 'center',
  color: theme.palette.Grey800
}))
const CloseButton = styled('button')(({ theme }) => ({
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0',
  color: theme.palette.Grey200,
  '&:hover': {
    color: theme.palette.Grey700
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
      <CloseButton tabIndex={-1} onClick={() => window.close()}>
        <CloseRoundedIcon />
      </CloseButton>
    </HeaderContainer>
  )
}
