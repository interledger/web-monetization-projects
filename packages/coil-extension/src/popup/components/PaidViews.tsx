import React from 'react'

import { PopupProps } from '../types'

import { UnmonetizedPage } from './UnmonetizedPage'
import { MonetizedPage } from './MonetizedPage'
import { CoilViews } from './CoilViews'

export const PaidViews = (props: PopupProps) => {
  const context = props.context
  const { monetized, coilSite } = context.store

  if (coilSite && !monetized) {
    return <CoilViews context={context} />
  } else if (monetized) {
    return <MonetizedPage context={context} />
  } else {
    return <UnmonetizedPage context={context} />
  }
}
