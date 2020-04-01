import React from 'react'

import { PopupProps } from '../types'

import { UnmonetizedPage } from './UnmonetizedPage'
import { MonetizedPage } from './MonetizedPage'
import { CoilViews } from './CoilViews'
import { CoilContainer } from './CoilContainer'

export const PaidViews = (props: PopupProps) => {
  const context = props.context
  const { monetized, coilSite } = context.store

  if (coilSite && !monetized) {
    return (
      <CoilContainer>
        <CoilViews context={context} />
      </CoilContainer>
    )
  } else if (monetized) {
    return <MonetizedPage context={context} />
  } else {
    return (
      <CoilContainer>
        <UnmonetizedPage context={context} />
      </CoilContainer>
    )
  }
}
