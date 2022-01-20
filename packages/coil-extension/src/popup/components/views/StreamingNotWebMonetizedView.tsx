import React, { useEffect, useRef } from 'react'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'
import lottie from 'lottie-web'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import streamingOffAnimation from '../lottie-animations/wm_streaming_off.json'

//
// Styles
//
const LottieWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
  height: 'auto',
  width: '196px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const Link = styled('a')(({ theme }: { theme: Theme }) => ({
  color: theme.palette.Green700,
  cursor: 'pointer'
}))

//
// Component
//
export const StreamingNotWebMonetizedView = () => {
  const theme = useTheme()
  const lottieAnchor = useRef(null)

  useEffect(() => {
    if (lottieAnchor.current) {
      // normally we would use this.streamingOff = lootie
      // but compiler is throwing error "this Object is possibly undefined", which is not possible: https://github.com/microsoft/TypeScript/issues/15385

      const streamingOff = lottie.loadAnimation({
        container: lottieAnchor.current,
        animationData: streamingOffAnimation,
        autoplay: true
      })
    }
  }, [lottieAnchor])

  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
      <LottieWrapper ref={lottieAnchor} />
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
