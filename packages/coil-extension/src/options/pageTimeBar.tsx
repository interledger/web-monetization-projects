import React from 'react'
import styled from 'styled-components'

import { Colors } from '../shared-theme/colors'
import { xsBreak } from '../shared-theme/theme'

const Bar = styled.div`
  margin: 8px 16px 8px 0;
  border-radius: 12px;
  padding: 2px;
  border: 2px solid ${Colors.Grey89};
  background: ${Colors.Grey50};
  @media only screen and (max-width: ${xsBreak}) {
    margin-right: 0;
  }
`
const Level = styled.div`
  border-radius: 8px;
  height: 8px;
  background: ${Colors.Red400};
`

export const PageTimeBar = (props: { total: number; fraction: number }) => {
  const width = (props.fraction / props.total) * 100
  return (
    <Bar>
      <Level style={{ width: width + '%' }} />
    </Bar>
  )
}
