import React from 'react'
import { Grid } from '@material-ui/core'

import { PopupProps } from '../types'

import { LinkUnderlined } from './util/Link'
import { StatusTypography } from './util/StatusTypography'

export const UnmonetizedPage = (props: PopupProps) => {
  const {
    context: {
      runtime: { tabOpener }
    }
  } = props
  const onClick = tabOpener(`${props.context.coilDomain}/learn-more`)
  return (
    <Grid container justify='center' alignItems='center'>
      <div>
        <StatusTypography variant='h6' align='center'>
          This site isn&apos;t supported&nbsp;yet
        </StatusTypography>
        <StatusTypography variant='subtitle1' align='center'>
          Is this your site? Learn how to <br />
          <LinkUnderlined onClick={onClick} target='_blank'>
            web monetize it
          </LinkUnderlined>
        </StatusTypography>
      </div>
    </Grid>
  )
}
