import React from 'react'

import { useStore } from '../context/storeContext'

import { Unsubscribed } from './Unsubscribed'
import { PaidViews } from './PaidViews'
import { LoggedOut } from './LoggedOut'

export const Status = () => {
  const { validToken, user } = useStore()

  if (validToken && user) {
    if (user.subscription?.active) {
      return <PaidViews />
    } else {
      return <Unsubscribed />
    }
  } else {
    return <LoggedOut />
  }
}
