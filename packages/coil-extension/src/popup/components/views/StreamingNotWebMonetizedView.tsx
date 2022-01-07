import React from 'react'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { useHost } from '../../context/popupHostContext'

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

const PrimaryImg = styled('img')({
  filter: 'grayscale(100%)'
})

const Link = styled('a')(({ theme }: { theme: Theme }) => ({
  color: theme.palette.Green700,
  cursor: 'pointer'
}))

//
// Component
//
export const StreamingNotWebMonetizedView = () => {
  const theme = useTheme()

  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
      <ImgWrapper>
        <StreamingImg src='/res/stream_loop.svg' width='171' height='22' />
        <PrimaryImg src='/res/img-woman.png' />
      </ImgWrapper>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Streaming not enabled
      </Typography>
      <Typography variant='subtitle1' align='center'>
        Is this your site?{' '}
        <Link>
          Learn how to
          <br />
          enable streaming payments
        </Link>
      </Typography>
    </NewHeaderFooterLayout>
  )
}
