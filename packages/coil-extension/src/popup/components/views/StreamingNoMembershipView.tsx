import React from 'react'
import { Typography, styled, Theme, useTheme, Box } from '@material-ui/core'

import { useHost } from '../../context/popupHostContext'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { WebMonetized } from '../icons/WebMonetized'
import { CtaButton } from '../CtaButton'
//
// Styles
//
const ImgWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(6),
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const WebMoIconWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  width: theme.spacing(8),
  height: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.Green400,
  borderRadius: '100%',
  '& > svg': {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.White
  }
}))

//
// Component
//
export const StreamingNoMembershipView = () => {
  const theme = useTheme()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onClick = tabOpener(coilDomain + '/settings/payment')

  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
      <ImgWrapper>
        <WebMoIconWrapper>
          <WebMonetized />
        </WebMoIconWrapper>
        <img src='/res/img-woman.png' />
      </ImgWrapper>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Support this content
      </Typography>
      <Box flex='1'>
        <Typography variant='subtitle1' align='center'>
          Get a $5/mo Coil membership to
          <br />
          support content and creators you love
        </Typography>
      </Box>
      <Box mt={2} mb={1} px={3}>
        <CtaButton onClick={onClick}>Become a member</CtaButton>
      </Box>
    </NewHeaderFooterLayout>
  )
}
