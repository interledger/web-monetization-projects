import React from 'react'
import { styled, Theme } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { useRouter } from '../context/routerContext'
import { ROUTES } from '../types'

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
export const Header = () => {
  const router = useRouter()
  const getHeaderMessage = (currentRoute: string) => {
    // excluded routes simply do not have a header title -> saw this from the figma design
    const EXCLUDED_ROUTES: Array<string> = []
    if (EXCLUDED_ROUTES.includes(currentRoute)) {
      return
    }
    if (currentRoute.includes(ROUTES.streaming)) {
      return 'Streaming Payments'
    }
    if (currentRoute.includes(ROUTES.tipping)) {
      return 'Tip This Site'
    }
    if (currentRoute.includes(ROUTES.settings)) {
      return 'Settings'
    }
    return
  }
  return (
    <HeaderContainer>
      <CoilLogo />
      <HeaderTitle>{getHeaderMessage(router.path)}</HeaderTitle>
      <CloseButton>
        <CloseRoundedIcon />
      </CloseButton>
    </HeaderContainer>
  )
}
