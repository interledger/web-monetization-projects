import React from 'react'
import { Grid } from '@material-ui/core'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusTypography } from '../util/StatusTypography'
import { StatusButton } from '../StatusButton'
import { useHost } from '../../context/popupHostContext'

export const CoilPopupView = () => {
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onClick = tabOpener(coilDomain + '/explore')

  return (
    <HeaderFooterLayout>
      <Grid container justify='center' alignItems='center'>
        <div>
          <StatusTypography variant='h6' align='center'>
            Welcome to Coil
          </StatusTypography>
          <StatusTypography variant='subtitle1' align='center'>
            Check out our Discover page to explore Web-Monetized content.
          </StatusTypography>
          <StatusButton
            text='Discover now'
            variant='contained'
            onClick={onClick}
          />
        </div>
      </Grid>
    </HeaderFooterLayout>
  )
}
