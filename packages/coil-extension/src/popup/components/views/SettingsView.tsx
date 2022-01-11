import React from 'react'
import { Typography, styled, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import ExploreIcon from '@material-ui/icons/Explore'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { useStore } from '../../context/storeContext'
import { useHost } from '../../context/popupHostContext'

//
// Styles
//
const SettingsPageContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.spacing(1)} 0`,
  backgroundColor: 'white'
}))

const ProfileContainer = styled('div')(() => ({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const ProfilePicture = styled('div')(({ src }: { src: string }) => ({
  height: '64px',
  width: '64px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '8px',
  borderRadius: '64px',
  backgroundImage: `url("${src}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat'
}))

const SettingsButton = styled('div')(({ theme }: { theme: Theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '18px',
  color: theme.palette.Grey800,
  '& > .title': {
    flex: '1',
    padding: '0px 16px'
  },
  '& > .icon-open': {
    color: theme.palette.Grey200
  },
  '&:hover': {
    backgroundColor: theme.palette.Grey50,
    '& > .icon-open': {
      color: theme.palette.Grey700
    }
  }
}))

//
// Component
//
export const SettingsView = () => {
  const { user } = useStore()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  return (
    <NewHeaderFooterLayout title='Settings'>
      <SettingsPageContainer>
        <ProfileContainer
          style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div>
            {user?.profilePicture && (
              <ProfilePicture src={user.profilePicture} />
            )}
            {user?.fullName && (
              <Typography variant='h6' align='center'>
                {user.fullName}
              </Typography>
            )}
            {(user?.shortName || user?.email) && (
              <Typography variant='subtitle1' align='center'>
                {user.shortName ?? user.email}
              </Typography>
            )}
          </div>
        </ProfileContainer>

        <SettingsButton onClick={tabOpener(`${coilDomain}/settings/acount`)}>
          <PersonIcon />
          <span className='title'>Account</span>
          <span className='icon-open'>
            <ChevronRightRoundedIcon />
          </span>
        </SettingsButton>
        <SettingsButton onClick={tabOpener(`${coilDomain}/discover`)}>
          <ExploreIcon />
          <span className='title'>Discover</span>
          <span className='icon-open'>
            <ChevronRightRoundedIcon />
          </span>
        </SettingsButton>
        <SettingsButton onClick={tabOpener(`${coilDomain}/about`)}>
          <HelpOutlineIcon />
          <span className='title'>About</span>
          <span className='icon-open'>
            <ChevronRightRoundedIcon />
          </span>
        </SettingsButton>
      </SettingsPageContainer>
    </NewHeaderFooterLayout>
  )
}
