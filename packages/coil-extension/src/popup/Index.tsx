import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core'

import { ToPopupMessage } from '../types/commands'
import { Colors } from '../shared-theme/colors'

import { Container } from './components/util/Container'
import { AccountBar } from './components/AccountBar'
import { WebMonetizedBar } from './components/WebMonetizedBar'
import { Status } from './components/Status'
import { PopupProps } from './types'

const CoilContainer = styled(Container)(({ theme }) => ({
  paddingRight: `${theme.spacing(4)}px`,
  paddingLeft: `${theme.spacing(4)}px`,
  paddingTop: `${theme.spacing(2)}px`,
  paddingBottom: `${theme.spacing(2)}px`,
  backgroundColor: Colors.Grey99
}))

const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

export function Index(props: PopupProps) {
  const [_, setLastMonetizationProgress] = useState(Date.now())

  function syncStoreAndSetState(key: string) {
    props.context.store.sync([key])
    setLastMonetizationProgress(Date.now())
  }

  function bindMessageListener() {
    const listener = (event: StorageEvent) => {
      if (event.key) {
        syncStoreAndSetState(event.key)
      }
    }
    props.context.events.on('storage', listener)
    return () => {
      props.context.events.removeListener('storage', listener)
    }
  }

  useEffect(bindMessageListener, [])

  const context = { ...props.context }

  return (
    <OuterDiv>
      <AccountBar context={context} />
      <CoilContainer>
        <Status context={context} />
      </CoilContainer>
      <WebMonetizedBar context={context} />
    </OuterDiv>
  )
}
