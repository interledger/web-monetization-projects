import React from 'react'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

//
// Styles
//
const ImgWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(6),
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const StreamingImg = styled('img')(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: theme.spacing(3)
}))

//
// Component
//
export const StreamingWebMonetizedView = () => {
  const theme = useTheme()
  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
      <ImgWrapper>
        <StreamingImg src='/res/stream_loop.svg' width='171' height='22' />
        <img src='/res/img-woman.png' />
      </ImgWrapper>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Thank You!
      </Typography>
      <Typography variant='subtitle1' align='center'>
        Your Coil Membership streams
        <br />
        payments to this site while you&apos;re on it
      </Typography>
    </NewHeaderFooterLayout>
  )
}
