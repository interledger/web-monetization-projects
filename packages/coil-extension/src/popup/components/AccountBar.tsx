import React, { FormEvent, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import More from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { styled, withStyles } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'
import { getMonthAndDay, isXMASPeriod } from '../../util/seasons'

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

const CoilToolbar = styled(Toolbar)({
  backgroundColor: Colors.White,
  borderBottom: `0.5px solid ${Colors.Grey89}`,
  height: '56px'
})

const CoilMenu = withStyles({
  paper: {
    minWidth: '113px'
  }
})(Menu)

type ClickEvent = FormEvent<HTMLElement>

export const CoilLogoImg = () => {
  const [month, day] = getMonthAndDay()
  const isXMAS = isXMASPeriod(month, day)
  const logo = isXMAS ? '/res/CoilLogoXMAS.svg' : '/res/CoilLogo.svg'
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

export const AccountBar = (props: PopupProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleMenuClick = (event: ClickEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event: ClickEvent) => {
    setAnchorEl(null)
  }
  const context = props.context
  const {
    coilDomain,
    state: { validToken, user, extensionBuildString },
    runtime: { tabOpener }
  } = context

  const loggedIn = Boolean(validToken)
  const onExploreClick = tabOpener(`${coilDomain}/explore`)
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
      {loggedIn && user ? (
        <Typography variant='body1'>{user.fullName}</Typography>
      ) : (
        <Muted>Not Logged in</Muted>
      )}
      <Flex />
      <IconButton aria-label='Menu' onClick={handleMenuClick}>
        <More />
      </IconButton>

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
        <MenuItem dense component='a' onClick={onExploreClick} target='_blank'>
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
          divider
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
