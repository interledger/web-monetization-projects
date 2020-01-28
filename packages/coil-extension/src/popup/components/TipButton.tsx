import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import { PopupProps } from '../types'

export enum TipState {
  READY = 0,
  LOADING,
  COMPLETE
}

export const TipButton = (props: PopupProps) => {
  const [tipState, setTipState] = useState(TipState.READY)
  const onClickTip = () => {
    setTipState(TipState.LOADING)
    // TODO: kick off async tip instead
    setTimeout(() => {
      setTipState(TipState.COMPLETE)
      setTimeout(() => {
        setTipState(TipState.READY)
      }, 1000)
    }, 500)
  }

  /* TODO: use something like this to tip the current page.
 * TODO: how do we grab the payment pointer from here?
 * TODO: should we just handle the response inline?
  const setStreamControls = (data: SetStreamControlsParams) => {
    const message: SetStreamControls = {
      command: 'setStreamControls',
      data
    }
    props.context.runtime.sendMessage(message)
  }
  */

  if (props.context.store.user.canTip) {
    switch (tipState) {
      case TipState.READY:
        return <Button onClick={onClickTip}>Tip this creator $1!</Button>

      case TipState.LOADING:
        return <Button disabled>Tipping...</Button>

      case TipState.COMPLETE:
        return <Button disabled>Tip complete!</Button>
    }
  } else {
    return <></>
  }
}
