import React from 'react'
import { Grid } from '@material-ui/core'

import { StatusTypography } from '../util/StatusTypography'
import { HeaderFooterLayout } from '../HeaderFooterLayout'

export const CoilExploreView = () => {
  return (
    <HeaderFooterLayout>
      <Grid container justify='center' alignItems='center'>
        <div>
          <StatusTypography variant='h6' align='center'>
            Discover Now
          </StatusTypography>
          <img src='/res/img-explore.svg' />
          <StatusTypography variant='subtitle1' align='center'>
            Your journey to the world of web monetized sites you can access and
            support starts here.
          </StatusTypography>
        </div>
      </Grid>
    </HeaderFooterLayout>
  )
}
