import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'

import { TipAddButton } from './TipAddButton'
import { TipSubButton } from './TipSubButton'

export interface TipCounterProps {
  tipAmount: number
}

const BigBalance = styled('p')(() => ({
  fontSize: '56px',
  lineHeight: '64px',
  margin: '0px',
  color: Colors.Grey800
}))

const Flex = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexAlign: 'center'
}))

export const TipCounter = ({ tipAmount }: TipCounterProps) => {
  return (
    <Flex>
      <TipAddButton />
      <BigBalance>{tipAmount}</BigBalance>
      <TipSubButton />
    </Flex>
  )
}
