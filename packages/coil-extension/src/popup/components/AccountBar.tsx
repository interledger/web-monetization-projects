import React, { FormEvent, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import More from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { styled, withStyles } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { getMonthAndDay, isXMASPeriod } from '../../util/seasons'
import { useStore } from '../context/storeContext'
import { useHost } from '../context/popupHostContext'

const Flex = styled('div')({
  flex: 1
})

const Muted = styled('p')({
  color: Colors.Grey500,
  fontSize: '14px'
})

const CoilImg = styled('img')({
  marginRight: '8px'
})

const CoilToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: Colors.White,
  borderBottom: `0.5px solid ${Colors.Grey89}`,
  height: '56px',
  [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
    minHeight: '56px',
    paddingLeft: '16px',
    paddingRight: '8px'
  }
}))

const CoilMenu = withStyles({
  paper: {
    minWidth: '113px'
  }
})(Menu)

type ClickEvent = FormEvent<HTMLElement>

export const CoilLogoImg = () => {
  const [month, day] = getMonthAndDay()
  const isXMAS = isXMASPeriod(month, day)
  const xmasLogo = '/res/CoilLogoXMAS.svg'
  const normalLogo = '/res/icn-coil-ext@4x.png'
  const logo = isXMAS ? normalLogo : normalLogo
  const logoWidth = isXMAS ? 28 : 24
  const style = isXMAS ? { marginTop: '-3px' } : {}
  return (
    <CoilImg
      style={style}
      width={logoWidth}
      height={logoWidth}
      src={logo}
      alt=''
    />
  )
}

const MoreButton = styled(IconButton)({
  width: 32,
  height: 32
})

export const AccountBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleMenuClick = (event: ClickEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const { validToken, user, extensionBuildString } = useStore()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onDiscoverClick = tabOpener(`${coilDomain}/discover`)
  const onAboutClick = tabOpener(`${coilDomain}/about`)
  const onSettingsClick = tabOpener(`${coilDomain}/settings`)

  const onBuildInfoClick = () => {
    if (extensionBuildString) {
      void navigator.clipboard.writeText(extensionBuildString)
    }
  }

  return (
    <CoilToolbar>
      <CoilLogoImg />
      {validToken && user ? (
        <Typography variant='body1'>{user.fullName ?? user.email}</Typography>
      ) : (
        <Muted>Not Logged in</Muted>
      )}
      <Flex />
      <MoreButton aria-label='Menu' onClick={handleMenuClick}>
        <More />
      </MoreButton>
      <CoilMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem dense component='a' onClick={onDiscoverClick} target='_blank'>
          <Typography variant='caption'>Discover</Typography>
        </MenuItem>

        <MenuItem
          divider
          dense
          component='a'
          onClick={onAboutClick}
          target='_blank'
        >
          <Typography variant='caption'>About</Typography>
        </MenuItem>

        <MenuItem
          divider={Boolean(extensionBuildString)}
          dense
          component='a'
          onClick={onSettingsClick}
          target='_blank'
        >
          <Typography variant='caption'>Settings</Typography>
        </MenuItem>

        {extensionBuildString && (
          <MenuItem
            divider
            dense
            component='a'
            onClick={onBuildInfoClick}
            target='_blank'
          >
            <Typography variant='caption'>Copy Build Info</Typography>
          </MenuItem>
        )}
      </CoilMenu>
    </CoilToolbar>
  )
}
