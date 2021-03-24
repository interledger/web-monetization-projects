import React from 'react'
import { Grid, styled } from '@material-ui/core'

import { Colors } from '../../../shared-theme/colors'
import { PopupProps } from '../../types'

import { HeaderFooterLayout } from '../HeaderFooterLayout'
import { StatusButton } from '../StatusButton'
import { StatusTypography } from '../util/StatusTypography'


//
// Styles
//

const Muted = styled('p')({
  color: Colors.Grey500,
  fontSize: '12px',
  fontWeight: 600
})

const Button = styled(StatusButton)({
  paddingLeft: '29px',
  paddingRight: '29px'
})



//
// Component
//
export const UnsubscribedView = (props: PopupProps) => {
    const {
        context,
        context: {
        coilDomain,
        runtime: { tabOpener }
        }
    } = props

    const titleString = 'Become a member'
    const subheading1 = 'To use Coil you need an active membership.'
    const footerString =
    'You can cancel your membership any time in the account settings page.'

    const onClick = tabOpener(coilDomain + '/settings/payment')

    return (
        <HeaderFooterLayout context={context}>
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
