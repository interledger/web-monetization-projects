import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ToPopupMessage } from '../types/commands'
import { Colors } from '../shared-theme/colors'

import { Container } from './components/util/Container'
import { AccountBar } from './components/AccountBar'
import { WebMonetizedBar } from './components/WebMonetizedBar'
import { Status } from './components/Status'
import { PopupProps } from './types'

const CoilContainer = styled(Container)`
  padding-right: ${({ theme }) => theme.spacing(4)}px;
  padding-left: ${({ theme }) => theme.spacing(4)}px;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${Colors.Grey99};
`

const OuterDiv = styled.div`
  min-width: 308px;
  max-width: 308px;
  height: auto;
  min-height: 260px;
`

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
      <CoilContainer>
        <Status context={context} />
      </CoilContainer>
      <WebMonetizedBar context={context} />
    </OuterDiv>
  )
}
