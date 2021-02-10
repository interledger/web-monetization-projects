import React from 'react'

import { PopupProps } from '../types'

import { LoggedOut } from './LoggedOut'
import { Unsubscribed } from './Unsubscribed'
import { PaidViews } from './PaidViews'
import { CoilContainer } from './CoilContainer'

export const Status = (props: PopupProps) => {
  const context = props.context
  const { validToken, user } = props.context.store

  if (validToken && user) {
    if (
      !user.subscription ||
      (user.subscription && !user.subscription.active)
    ) {
      return (
        <CoilContainer>
          <Unsubscribed context={context} />
        </CoilContainer>
      )
    } else {
      return <PaidViews context={context} />
    }
  } else {
    return (
      <CoilContainer>
        <LoggedOut context={context} />
      </CoilContainer>
    )
  }
}
