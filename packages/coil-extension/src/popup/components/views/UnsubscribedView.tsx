import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { Colors } from '../../../shared-theme/colors'
import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusButton } from '../StatusButton'
import { StatusTypography } from '../util/StatusTypography'
import { useHost } from '../../context/popupHostContext'

//
// Styles
//

const Muted = styled('p')({
  color: Colors.Grey500,
  fontSize: '12px',
  fontWeight: 400
})

const Button = styled(StatusButton)({
  paddingLeft: '29px',
  paddingRight: '29px'
})

//
// Component
//
export const UnsubscribedView = () => {
  const {
    coilDomain,
    runtime: { tabOpener }
  } = useHost()

  const titleString = 'Become a member'
  const subheading1 = 'To use Coil you need an active membership.'
  const footerString =
    'You can cancel your membership any time in the account settings page.'

  const onClick = tabOpener(coilDomain + '/settings/payment')

  return (
    <HeaderFooterLayout>
      <Grid container justify='center' alignItems='center'>
        <div>
          <StatusTypography variant='h6' align='center'>
            {titleString}
          </StatusTypography>
          <StatusTypography variant='subtitle1' align='center'>
            {subheading1}
          </StatusTypography>
          <Button
            text='Join&nbsp;Coil&nbsp;for&nbsp;$5/mo'
            variant='contained'
            onClick={onClick}
          />
          <Muted>{footerString}</Muted>
        </div>
      </Grid>
    </HeaderFooterLayout>
  )
}
