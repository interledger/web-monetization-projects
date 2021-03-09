import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import { PopupProps } from '../types'
import { SendTip, SendTipResult } from '../../types/commands'

import { TippingButton } from './TippingButton'

export enum TipState {
  READY = 0,
  LOADING,
  COMPLETE,
  ERROR
}

export const TipButton = (props: PopupProps) => {
  const [tipState, setTipState] = useState(TipState.READY)
  const onClickTip = async (d: number) => {
    setTipState(TipState.LOADING)

    const { success } = await sendTip(d)

    if (success) {
      setTipState(TipState.COMPLETE)
    } else {
      setTipState(TipState.ERROR)
    }

    setTimeout(() => {
      setTipState(TipState.READY)
    }, 1500)
  }

  const sendTip = async (amountDollars: number) => {
    const message: SendTip = { command: 'sendTip', data: { amountDollars } }

    return new Promise(resolve => {
      props.context.runtime.sendMessage(message, (result: SendTipResult) => {
        resolve(result)
      })
    }) as Promise<SendTipResult>
  }
  const maxCents = props.context.store.user.tipCredit?.balanceCents ?? 0
  const maxDollars = maxCents / 100
  const max = Math.min(maxDollars, 20)

  if (props.context.store.user.canTip) {
    switch (tipState) {
      case TipState.READY:
        return (
          <TippingButton
            initial={1}
            max={max}
            disabled={props.context.store.monetizedTotal === 0}
            onClick={onClickTip}
          />
        )
      case TipState.LOADING:
        return <Button disabled>Tipping... </Button>

      case TipState.COMPLETE:
        return <Button disabled>Tip complete! (1c fixed)</Button>

      case TipState.ERROR:
        return <Button disabled>Something went wrong.</Button>
    }
  } else {
    return <></>
  }
}
