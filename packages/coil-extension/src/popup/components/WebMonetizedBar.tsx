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

const NotMonetizedText = styled('span')(({ theme }) => ({
  color: Colors.Grey500New,
  fontWeight: 400
}))

export const WebMonetizedBar = (props: PopupProps) => {
  const { monetized, coilSite } = props.context.store
  if (coilSite && !monetized) {
    return null
  } else {
    return (
      <CoilBar>
        {monetized ? (
          <BarBadge src='/res/wm-icon-active.svg' width='16' height='16' />
        ) : (
          <BarBadge src='/res/wm-icon-inactive.svg' width='16' height='16' />
        )}
        {monetized && (
          <Typography variant='caption'>This site is web monetized</Typography>
        )}
        {!monetized && (
          <Typography
            variant='caption'
            style={{ fontWeight: 400, color: Colors.Grey500New }}
          >
            This site is&apos;nt web monetized
          </Typography>
        )}
      </CoilBar>
    )
  }
}
