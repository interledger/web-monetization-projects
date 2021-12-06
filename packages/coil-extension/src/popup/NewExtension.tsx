import React from 'react'
import { Box, styled } from '@material-ui/core'

import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
import { Router } from './components/views/Router'
import { ROUTES } from './contants'
import { useRouter } from './context/routerContext'

//
// Styles
//
const AppContainer = styled('div')({
  width: '308px',
  maxWidth: '308px',
  height: '455px',
  maxHeight: '455px',
  position: 'relative',
  overflow: 'hidden',
  background: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column'
})

//
// Component
//
export const NewExtension = () => {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  )
}
