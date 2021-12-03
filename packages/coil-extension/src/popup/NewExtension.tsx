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

const NavBar = styled('div')(({ theme }: Theme) => ({
  display: 'flex'
}))

const NavButton = styled('div')(({ theme }: Theme) => ({
  cursor: 'pointer',
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '19px 0px',
  color: theme.palette.Grey200,
  '&:hover, &.active': {
    '&:nth-child(1)': {
      color: theme.palette.Green700
    },
    '&:nth-child(2)': {
      color: theme.palette.Violet700
    },
    '&:last-child': {
      color: theme.palette.Grey800
    }
  }
}))

export const NewExtension = () => {
  const router = useRouter()
  return (
    <OuterDiv>
      <Box style={{ backgroundColor: 'red' }}>Header Placeholder</Box>
      <Box style={{ backgroundColor: 'pink', flex: '1' }}>
        <button onClick={router.back}>back</button>
      </Box>
      <NavBar>
        <NavButton
          className={router.path.includes('streaming') ? 'active' : ''}
          onClick={() => router.push('streaming')}
        >
          <WebMonetized />
        </NavButton>
        <NavButton
          className={router.path.includes('tipping') ? 'active' : ''}
          onClick={() => router.push('tipping')}
        >
          <Gift />
        </NavButton>
        <NavButton
          className={router.path.includes('settings') ? 'active' : ''}
          onClick={() => router.push('settings')}
        >
          <SettingsIcon />
        </NavButton>
      </NavBar>
    </OuterDiv>
  )
}
