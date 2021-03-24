import React from 'react'
import { Grid } from '@material-ui/core'

import { PopupProps } from '../../types'
import { StatusTypography } from '../util/StatusTypography'
import { HeaderFooterLayout } from '../HeaderFooterLayout'

export const CoilExploreView = (props: PopupProps) => {
    const { context } = props;

    return (
        <HeaderFooterLayout context={context}>
            <Grid container justify='center' alignItems='center'>
                <div>
                    <StatusTypography variant='h6' align='center'>
                        Discover Now
                    </StatusTypography>
                    <img src='/res/img-explore.svg' />
                    <StatusTypography variant='subtitle1' align='center'>
                        On this page you can find all Web-Monetized sites that you can support
                        with your Coil membership.
                    </StatusTypography>
                </div>
            </Grid>
        </HeaderFooterLayout>
    )
}
