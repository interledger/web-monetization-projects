import React from 'react'
import { Grid } from '@material-ui/core'

import { StatusTypography } from './util/StatusTypography'

export const CoilExplore = () => {
  return (
    <Grid container justify='center' alignItems='center'>
      <div>
        <StatusTypography variant='h6' align='center'>
          Start Exploring
        </StatusTypography>
        <img src='/res/img-explore.svg' />
        <StatusTypography variant='subtitle1' align='center'>
          On this page you can find all Web-Monetized sites that you can support
          with your Coil membership.
        </StatusTypography>
      </div>
    </Grid>
  )
}
