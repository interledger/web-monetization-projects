import React from 'react'
import { Box, styled, Theme } from '@material-ui/core'
import { theme } from 'packages/interledger-minute-extension/src/theme'
import SettingsIcon from '@material-ui/icons/Settings'

import { WebMonetized } from './components/icons/WebMonetized'
import { Gift } from './components/icons/Gift'
import { TipRouter } from './components/views/TipRouter'
import { MonetizedRouter } from './components/views/MonetizedRouter'
import { CoilDiscoverView } from './components/views/CoilDiscoverView'
import { useRouter } from './context/routerContext'
import { NavBar } from './components/NavBar'

//
// Styles
//
const OuterDiv = styled('div')({
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

export const NewExtension = () => {
  const router = useRouter()
  return (
    <OuterDiv>
      <Box style={{ backgroundColor: 'red' }}>Header Placeholder</Box>
      <Box style={{ backgroundColor: 'pink', flex: '1' }}>
        <button onClick={router.back}>back</button>
      </Box>
      <NavBar />
    </OuterDiv>
  )
}
