import React from 'react'
import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'
import { formatAmount } from '../../util/currencyFormatting'

import { TipAddButton } from './TipAddButton'
import { TipSubButton } from './TipSubButton'

export interface TipCounterProps {
  tipAmount: number
  increase: () => void
  decrease: () => void
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

export const TipCounter = (props: TipCounterProps) => {
  const formattedAmount = formatAmount({
    amount: String(props.tipAmount),
    assetCode: 'USD',
    assetScale: 2
  })

  return (
    <Flex>
      <TipSubButton onClick={props.decrease} />
      <BigBalance>{formattedAmount}</BigBalance>
      <TipAddButton onClick={props.increase} />
    </Flex>
  )
}
