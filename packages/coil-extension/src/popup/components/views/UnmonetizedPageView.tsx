import React from 'react'
import { Grid } from '@material-ui/core'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { Link } from '../util/Link'
import { StatusTypography } from '../util/StatusTypography'
import { useHost } from '../../context/popupHostContext'

export const UnmonetizedPageView = () => {
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const onClick = tabOpener(`${coilDomain}/learn-more`)

  return (
    <HeaderFooterLayout>
      <Grid container justify='center' alignItems='center'>
        <div>
          <StatusTypography variant='h6' align='center'>
            This website is not supported yet <img src='/res/tfwnowm.svg' />
          </StatusTypography>
          <StatusTypography variant='subtitle1' align='center'>
            <Link onClick={onClick} target='_blank'>
              {/* uses a non-breaking hyphen so it wraps correctly */}
              Learn how to make sites Web&#8209;Monetized.
            </Link>
          </StatusTypography>
        </div>
      </Grid>
    </HeaderFooterLayout>
  )
}
