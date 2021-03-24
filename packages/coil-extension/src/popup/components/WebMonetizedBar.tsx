import React from 'react'
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'

const CoilBar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: `0.5px solid ${Colors.Grey89}`,
  backgroundColor: Colors.White,
  height: '40px',
  textAlign: 'center'
})

const BarBadge = styled('img')({
  marginRight: '4px'
})

const NotMonetizedTypography = styled(Typography)({
  color: Colors.Grey500New,
  fontWeight: 400
})

export const WebMonetizedBar = (props: PopupProps) => {
  const { monetized, coilSite } = props.context.store
  const icon = monetized
    ? '/res/wm-icon-active.svg'
    : '/res/wm-icon-inactive.svg'

  if (coilSite && !monetized) {
    return null
  } else {
    return (
      <CoilBar>
        <BarBadge src={icon} width='16' height='16' />
        {monetized ? (
          <Typography variant='caption'>This site is web monetized</Typography>
        ) : (
          <NotMonetizedTypography variant='caption'>
            This site isn&apos;t web monetized
          </NotMonetizedTypography>
        )}
      </CoilBar>
    )
  }
}
