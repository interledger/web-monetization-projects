import React from 'react'
import { Box, styled, Theme } from '@material-ui/core'
import { theme } from 'packages/interledger-minute-extension/src/theme'
// import {SettingsIcon} from '@material-ui/icons'
import SettingsIcon from '@material-ui/icons/Settings'

import { WebMonetized } from './components/icons/WebMonetized'
import { Gift } from './components/icons/Gift'

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
  '&:hover': {
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
  return (
    <OuterDiv>
      <Box style={{ backgroundColor: 'red' }}>Header Placeholder</Box>
      <Box style={{ backgroundColor: 'pink', flex: '1' }}>Body Placeholder</Box>
      <NavBar>
        <NavButton>
          <WebMonetized />
        </NavButton>
        <NavButton>
          <Gift />
        </NavButton>
        <NavButton>
          <SettingsIcon />
        </NavButton>
      </NavBar>
    </OuterDiv>
  )
}
