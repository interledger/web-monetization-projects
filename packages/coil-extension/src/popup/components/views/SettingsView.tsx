import React from 'react'
import { Box, styled, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import ExploreIcon from '@material-ui/icons/Explore'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

//
// Styles
//
const SettingsButton = styled('div')(({ theme }: { theme: Theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '18px',
  color: theme.palette.Grey800,
  '& > span': {
    flex: '1',
    padding: '0px 16px'
  }
}))

//
// Component
//
export const SettingsView = () => {
  return (
    <NewHeaderFooterLayout title='Settings'>
      <Box
        style={{
          backgroundColor: 'white',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 0px'
        }}
      >
        <Box style={{ flex: '1' }}>new settings view</Box>
        <SettingsButton>
          <PersonIcon />
          <span>Account</span>
          <ChevronRightRoundedIcon />
        </SettingsButton>
        <SettingsButton>
          <ExploreIcon />
          <span>Discover</span>
          <ChevronRightRoundedIcon />
        </SettingsButton>
        <SettingsButton>
          <HelpOutlineIcon />
          <span>About</span>
          <ChevronRightRoundedIcon />
        </SettingsButton>
      </Box>
    </NewHeaderFooterLayout>
  )
}
