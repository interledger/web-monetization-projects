import React from 'react'
import { styled } from '@mui/material'
import { AnimatePresence } from 'framer-motion'

import { useRouter } from './context/routerContext'
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
  const { path } = useRouter()
  return (
    <AppContainer>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Router path={path} />
      </AnimatePresence>
    </AppContainer>
  )
}
