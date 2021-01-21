import React from 'react'

import { PopupProps } from '../types'

import { CoilPopup } from './CoilPopup'
import { CoilExplore } from './CoilExplore'

export const CoilViews = (props: PopupProps) => {
  const { coilSite } = props.context.state
  const pathname = coilSite ? new URL(coilSite).pathname : ''
  console.log('coil url=', coilSite)
  if (pathname === '/explore') {
    return <CoilExplore />
  } else {
    return <CoilPopup {...props} />
  }
}
