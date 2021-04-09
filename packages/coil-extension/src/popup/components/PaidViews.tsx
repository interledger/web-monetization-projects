import React from 'react'

import { useStore } from '../context/storeContext'

import { UnmonetizedPage } from './UnmonetizedPage'
import { MonetizedPage } from './MonetizedPage'
import { CoilViews } from './CoilViews'

export const PaidViews = () => {
  const { monetized, coilSite } = useStore()

  if (coilSite && !monetized) {
    return <CoilViews />
  } else if (monetized) {
    return <MonetizedPage />
  } else {
    return <UnmonetizedPage />
  }
}
