import React from 'react'
import { Typography, styled, Theme, useTheme, Box } from '@mui/material'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { CtaButton } from '../CtaButton'
import { useHost } from '../../context/popupHostContext'
import { useStore } from '../../context/storeContext'

//
// Styles
//
const ImgWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto'
}))

//
// Component
//
export const StreamingCoilView = () => {
  const theme = useTheme()
  const { user } = useStore()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onClick = tabOpener(coilDomain + '/discover')
  const firstName = user?.fullName?.split(' ')[0]

  return (
    <NewHeaderFooterLayout title='Stream Payments'>
      <ImgWrapper>
        <img src='/res/img-discover.svg' />
      </ImgWrapper>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Welcome{firstName ? `, ${firstName}` : ''}
      </Typography>
      <Box flex='1'>
        <Typography variant='subtitle1' align='center'>
          Explore the world of web monetized
          <br />
          content on our Discover page
        </Typography>
      </Box>
      <Box mt={2} mb={1} px={3}>
        <CtaButton onClick={onClick}>Discover now</CtaButton>
      </Box>
    </NewHeaderFooterLayout>
  )
}
