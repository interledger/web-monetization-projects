import React from 'react'
import { Grid } from '@material-ui/core'

import { PopupProps } from '../../types'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusTypography } from '../util/StatusTypography'
import { StatusButton } from '../StatusButton'

export const CoilPopupView = (props: PopupProps) => {
  const {
    context,
    context: {
      runtime: { tabOpener },
      coilDomain
    }
  } = props

  const onClick = tabOpener(coilDomain + '/explore')
  
  return (
    <HeaderFooterLayout context={context}>
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
