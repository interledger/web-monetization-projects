import React from 'react'
import { Grid } from '@material-ui/core'

import { useHost } from '../context/popupHostContext'

import { Link } from './util/Link'
import { StatusTypography } from './util/StatusTypography'
import { StatusButton } from './StatusButton'

const titleString = 'Welcome to Coil'
const subheading1 = 'Coil Supports the websites you love with a small donation.'
const footerString = "Don't have an account yet?"

// This isn't actually used anymore as the browser action just opens
// the coil site login page
// TODO: remove (but check it's not needed in rare case when popup
//  is left open, and you log out)
export const LoggedOut = () => {
  const { coilDomain } = useHost()

  return (
    <Grid container justify='center' alignItems='center'>
      <div>
        {/* h6 title */}
        <StatusTypography variant='subtitle2' align='center'>
          {titleString}
        </StatusTypography>
        <StatusTypography variant='subtitle1' align='center'>
          {subheading1}
        </StatusTypography>
        <StatusButton
          href={coilDomain + '/login'}
          text='Log in'
          variant='contained'
        />
        <StatusTypography variant='subtitle1' align='inherit'>
          {footerString}{' '}
          <Link href={coilDomain + '/signup'} target='_blank'>
            Sign up
          </Link>
        </StatusTypography>
      </div>
    </Grid>
  )
}
