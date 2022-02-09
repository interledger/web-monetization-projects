import React from 'react'
import { Typography, styled, Theme, useTheme } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

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
export const StreamingCoilDiscoverView = () => {
  const theme = useTheme()

  return (
    <NewHeaderFooterLayout title='Streaming Payments'>
      <ImgWrapper>
        <img src='/res/img-discover.svg' />
      </ImgWrapper>
      <Typography
        variant='h6'
        align='center'
        style={{ marginBottom: theme.spacing(1) }}
      >
        Discover now
      </Typography>
      <Typography variant='subtitle1' align='center'>
        Learn all about the creators and content
        <br />
        you can support using web monetization
      </Typography>
    </NewHeaderFooterLayout>
  )
}
