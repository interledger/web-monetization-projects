import React, { useEffect, useRef } from 'react'
import { styled, Theme, Typography, useTheme } from '@material-ui/core'
import lottie from 'lottie-web'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import streamingOffAnimation from '../lottie-animations/wm_streaming_off.json'
import { useHost } from '../../context/popupHostContext'
import { Link } from '../Link'
import { useStore } from '../../context/storeContext'

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

const goodByeTwitchBotPost = `https://contenthub.coil.com/content/bidding-adieu-to-the-coil-twitch-bot`
//
// Component
//
export const StreamingNotWebMonetizedView = () => {
  const theme = useTheme()
  const lottieAnchor = useRef(null)
  const { coilDomain } = useHost()
  const { topFrameHref } = useStore()

  const isTwitch = topFrameHref
    ? new URL(topFrameHref).hostname.endsWith('twitch.tv')
    : false

  const notEnabledMessage = isTwitch
    ? 'Twitch not supported'
    : 'Streaming not enabled'

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
        {notEnabledMessage}
      </Typography>
      {isTwitch ? (
        <Typography variant='subtitle1' align='center'>
          We are sad to say that Twitch is <br />
          no longer supported. Please see <br />
          our{' '}
          <Link to={goodByeTwitchBotPost} color={theme.palette.Green700}>
            Blog Post
          </Link>{' '}
          for more details.
        </Typography>
      ) : (
        <Typography variant='subtitle1' align='center'>
          Is this your site?{' '}
          <Link to={`${coilDomain}/learn-more`} color={theme.palette.Green700}>
            Learn how to
            <br />
            enable streaming payments
          </Link>
        </Typography>
      )}
    </NewHeaderFooterLayout>
  )
}
