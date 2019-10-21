import React from 'react'

import { PopupProps } from '../types'

import { LoggedOut } from './LoggedOut'
import { Unsubscribed } from './Unsubscribed'
import { PaidViews } from './PaidViews'

export const Status = (props: PopupProps) => {
  const context = props.context
  const { validToken, user } = props.context.store

  if (validToken && user) {
    if (
      !user.subscription ||
      (user.subscription && !user.subscription.active)
    ) {
      return <Unsubscribed context={context} />
    } else {
      return <PaidViews context={context} />
    }
  } else {
    return <LoggedOut context={context} />
  }
}
