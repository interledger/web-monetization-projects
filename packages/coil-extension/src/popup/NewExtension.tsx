import React from 'react'
import { Box, styled } from '@material-ui/core'

import { Header } from './components/Header'
import { NavBar } from './components/NavBar'

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
  background: 'linear-gradient(180deg, #FCFCFC 86.53%, #FFFFFF 97.24%)',
  display: 'flex',
  flexDirection: 'column'
})

const BodyContainer = styled('div')({
  backgroundColor: 'pink',
  flex: '1',
  display: 'flex',
  flexDirection: 'column'
})

//
// Component
//
export const NewExtension = () => {
  return (
    <AppContainer>
      <Header />
      <BodyContainer>View router here</BodyContainer>
      <NavBar />
    </AppContainer>
  )
}
