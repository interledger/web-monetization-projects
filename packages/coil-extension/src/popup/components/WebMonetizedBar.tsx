import React from 'react'
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'

const CoilBar = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderTop: `0.5px solid ${Colors.Grey89}`,
  backgroundColor: Colors.White,
  height: '40px',
  textAlign: 'center'
})

const BarBadge = styled('img')({
  marginRight: '4px',
  position: 'relative',
  top: '3px'
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
        <Typography variant='caption'>
          {monetized ? (
            <BarBadge src='/res/wm-icon-active.svg' width='16' height='16' />
          ) : (
            <BarBadge src='/res/wm-icon-inactive.svg' width='16' height='16' />
          )}
          {monetized ? (
            'This site is web monetized '
          ) : (
            <NotMonetizedText>
              This site is&apos;nt web monetized
            </NotMonetizedText>
          )}
        </Typography>
      </CoilBar>
    )
  }
}
