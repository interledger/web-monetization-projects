import React from 'react'

import { useStore } from '../context/storeContext'

import { CoilPopup } from './CoilPopup'
import { CoilExplore } from './CoilExplore'

export const CoilViews = () => {
  const { coilSite } = useStore()
  if (coilSite) {
    const { pathname } = new URL(coilSite)
    if (pathname === '/explore') {
      return <CoilExplore />
    }
  }
  return <CoilPopup />
}
