import React from 'react'
import { styled } from '@material-ui/core'

import { Router } from './components/views/Router'

//
// Styles
//
const AppContainer = styled('div')({
  width: '308px',
  maxWidth: '308px',
  height: '457px',
  maxHeight: '457px',
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
