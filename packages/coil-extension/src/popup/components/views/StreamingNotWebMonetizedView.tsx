import React, { useEffect, useRef } from 'react'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'
import lottie from 'lottie-web'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import streamingOffAnimation from '../lottie-animations/wm_streaming_off.json'
import { useHost } from '../../context/popupHostContext'
import { Link } from '../Link'

//
// Styles
//
const LottieWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
  height: '152px',
  width: '196px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

//
// Component
//
export const StreamingNotWebMonetizedView = () => {
  const theme = useTheme()
  const lottieAnchor = useRef(null)
  const { coilDomain } = useHost()

  useEffect(() => {
    if (lottieAnchor.current) {
      lottie.loadAnimation({
        container: lottieAnchor.current,
        animationData: streamingOffAnimation,
        autoplay: true
      })
    }
  }, [lottieAnchor])

  return (
    <NewHeaderFooterLayout title='Stream Payments'>
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
        <Link to={`${coilDomain}/learn-more`} color={theme.palette.Green700}>
          Learn how to
          <br />
          enable streaming payments
        </Link>
      </Typography>
    </NewHeaderFooterLayout>
  )
}
