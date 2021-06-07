import React from 'react'
import { Grid } from '@material-ui/core'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusTypography } from '../util/StatusTypography'
import { StatusButton } from '../StatusButton'
import { useHost } from '../../context/popupHostContext'
import { useStore } from '../../context/storeContext'

export const CoilPopupView = () => {
  const { user } = useStore()
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onClick = tabOpener(coilDomain + '/discover')

  return (
    <HeaderFooterLayout>
      <Grid container justify='center' alignItems='center'>
        <div>
          <StatusTypography variant='h6' align='center'>
            {user?.fullName
              ? `Welcome, ${user.fullName.split(' ')[0]}`
              : 'Welcome to Coil'}
          </StatusTypography>
          <StatusTypography variant='subtitle1' align='center'>
            Explore the world of web monetized content on our Discover page.
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
