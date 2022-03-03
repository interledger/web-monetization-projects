import React from 'react'
import { styled } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'

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
      <AnimatePresence exitBeforeEnter initial={true}>
        <Router />
      </AnimatePresence>
    </AppContainer>
  )
}
