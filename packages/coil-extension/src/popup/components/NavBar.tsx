import React from 'react'
import { Box, styled, Theme } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

import { useStore } from '../context/storeContext'
import { useRouter } from '../context/routerContext'
import { ROUTES } from '../constants'

import { WebMonetized } from './icons/WebMonetized'
import { Gift } from './icons/Gift'

//
// Styles
//

const NavButton = styled('div')(
  ({ theme, disabled }: { theme: Theme; disabled: boolean }) => ({
    cursor: 'pointer',
    flex: '1',
    display: disabled ? 'none' : 'flex',
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
  })
)

//
// Component
//

export const NavBar = () => {
  const router = useRouter()
  const { user } = useStore()
  const { tipCredits, tipSettings: { inTippingBeta = false } = {} } = user ?? {}

  const newUiFeatureFlag = true //todo: need to replace with background api call

  // this might cause some odd rendering side effects once the user has completed a tip that would
  // drain their tipCredit balance and revoke their eligibility to use tipping
  const canTip =
    newUiFeatureFlag && ((!inTippingBeta && tipCredits > 0) || inTippingBeta)

  return (
    <Box display='flex'>
      <NavButton
        className={router.path.includes('streaming') ? 'active' : ''}
        onClick={() => router.to(ROUTES.streaming)}
      >
        <WebMonetized />
      </NavButton>
      <NavButton
        disabled={!canTip}
        className={router.path.includes('tipping') ? 'active' : ''}
        onClick={() => router.to(ROUTES.tipping)}
      >
        <Gift />
      </NavButton>
      <NavButton
        className={router.path.includes('settings') ? 'active' : ''}
        onClick={() => router.to(ROUTES.settings)}
      >
        <SettingsIcon />
      </NavButton>
    </Box>
  )
}
