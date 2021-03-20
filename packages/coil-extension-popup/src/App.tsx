//! prototype use only - run on vercel

import React, { useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as actions from '@coil/extension-popup/redux/actions'
import { IRootState } from '@coil/extension-popup/redux/models'
import { styled, Container } from '@material-ui/core'
import {
  BrowserBar,
  Instructions,
  ExtensionPopUp,
  SettingsPanel,
  DesignOne,
  DesignTwo,
  DesignThree,
  DesignFour
} from '@coil/extension-popup/components'
import { ProcessStep } from '@coil/extension-popup/types'

//
// Styles
//
const ExtensionViewWrapper = styled('div')({
  width: '308px',
  background: 'linear-gradient(180deg, #FCFCFC 86.53%, #FFFFFF 97.24%)'
})

//
// Component
//
export const App = (): React.ReactElement => {
  const dispatch = useDispatch()
  const {
    processStep,
    extensionIsOpen,
    settingsIsOpen,
    designIteration
  } = useSelector((state: IRootState) => state, shallowEqual)
  const processStepRef = useRef(processStep)
  const extensionIsOpenRef = useRef(extensionIsOpen)

  React.useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDown, true)
  }, [])

  useEffect(() => {
    // Ensure state propagates to event handler
    processStepRef.current = processStep
    extensionIsOpenRef.current = extensionIsOpen
  }, [processStep, extensionIsOpen])

  // had this setup to iterate over an array but it wouldn't work on re-render
  const getDesign = () => {
    switch (designIteration) {
      case 1:
        return <DesignOne />
      case 2:
        return <DesignTwo />
      case 3:
        return <DesignThree />
      case 4:
        return <DesignFour />
      default:
        return <DesignOne />
    }
  }

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return // Do nothing if the event was already processed
    }
    const _processStep = processStepRef.current
    const _extensionIsOpen = extensionIsOpenRef.current

    switch (event.key) {
      case 'Enter':
        if (_processStep == ProcessStep.Tip && _extensionIsOpen)
          dispatch(actions.set_process_step(ProcessStep.Pending))
        else if (_processStep == 'PENDING')
          dispatch(actions.set_process_step(ProcessStep.Tip))
        break
      case 'Esc': // IE/Edge specific value
      case 'Escape':
        if (_processStep != ProcessStep.Pending && _extensionIsOpen)
          dispatch(actions.toggle_extension())
        else dispatch(actions.set_process_step(ProcessStep.Tip))
        break
      default:
        return // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault()
  }

  return (
    <div>
      <BrowserBar />
      <ExtensionPopUp isOpen={extensionIsOpen}>
        <ExtensionViewWrapper>{getDesign()}</ExtensionViewWrapper>
      </ExtensionPopUp>
      <SettingsPanel isOpen={settingsIsOpen} />
      <Container>
        <Instructions />
      </Container>
    </div>
  )
}
