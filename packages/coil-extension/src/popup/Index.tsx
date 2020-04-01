import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core'

import { ToPopupMessage } from '../types/commands'

import { AccountBar } from './components/AccountBar'
import { WebMonetizedBar } from './components/WebMonetizedBar'
import { Status } from './components/Status'
import { PopupProps } from './types'

const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

export function Index(props: PopupProps) {
  const [_, setLastMonetizationProgress] = useState(Date.now())

  function syncStoreAndSetState() {
    props.context.store.sync()
    setLastMonetizationProgress(Date.now())
  }

  function bindMessageListener(): void {
    props.context.runtime.onMessageAddListener((message: ToPopupMessage) => {
      if (message.command === 'localStorageUpdate') {
        syncStoreAndSetState()
      }
      return false
    })
  }

  useEffect(bindMessageListener, [])

  const context = { ...props.context }

  return (
    <OuterDiv>
      <AccountBar context={context} />
      <Status context={context} />
      <WebMonetizedBar context={context} />
    </OuterDiv>
  )
}
