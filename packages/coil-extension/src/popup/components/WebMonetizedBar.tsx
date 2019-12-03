import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import { Colors } from '../../shared-theme/colors'
import { PopupProps } from '../types'

const CoilBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 0.5px solid ${Colors.Grey89};
  background-color: ${Colors.White};
  height: 40px;
  text-align: center;
`

const BarBadge = styled.img`
  position: relative;
  top: 0.13em;
  margin-right: 4px;
`

const Muted = styled.span`
  color: ${Colors.Grey500};
  font-size: 12px;
`

export const WebMonetizedBar = (props: PopupProps) => {
  const { coilDomain } = props.context
  const { monetized, adapted, coilSite } = props.context.store
  if (coilSite && !monetized) {
    return null
  } else {
    const notProduction = coilDomain !== 'https://coil.com'
    return (
      <CoilBar style={{ height: notProduction ? 60 : 40 }}>
        <Typography variant='caption'>
          {monetized ? (
            <BarBadge src='/res/dollar.svg' width='13' height='14' />
          ) : (
            <BarBadge src='/res/nodollar.svg' width='13' height='14' />
          )}
          {adapted && monetized
            ? ' Coil can donate to this channel'
            : ' This page is'}
          {monetized ? '' : ' not'}
          {monetized && adapted ? '' : ' Web-Monetized'}
          <Muted> {notProduction ? new URL(coilDomain).host : ''}</Muted>
        </Typography>
      </CoilBar>
    )
  }
}
