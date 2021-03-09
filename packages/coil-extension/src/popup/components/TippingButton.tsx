import React, { ChangeEvent, useRef, useState } from 'react'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

export const TippingButton = (props: {
  disabled: boolean
  initial: number
  max: number
  onClick?: (amount: number) => void
}) => {
  const [amount, setAmount] = useState(props.initial)
  const [editing, setEditing] = useState(false)

  const onAmountLabelKeyDown = () => {
    setEditing(true)
  }

  function onEditKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.stopPropagation()
      event.currentTarget.blur()
      setEditing(false)
    }
  }

  function onTipClick(event: React.MouseEvent) {
    if (props.onClick) {
      props.onClick(amount)
    }
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const normalized = value /// value.replace(/[^0-9.]/g, '')
    const asNumber = Number(normalized)
    const number = Math.min(asNumber, props.max)
    if (number === props.max) {
      for (const t of [event.target, event.currentTarget]) {
        if (t instanceof HTMLInputElement) {
          t.select()
        }
      }
    }
    if (!isNaN(number)) {
      setAmount(number)
    }
  }

  const onAmountLabelClick = (event: React.MouseEvent) => {
    setEditing(true)
    event.stopPropagation()
  }

  return (
    <Button disabled={props.disabled} component='span' onClick={onTipClick}>
      Boost &nbsp;
      {!editing && (
        <span
          style={{ cursor: 'text' }}
          tabIndex={0}
          role='button'
          onKeyDown={onAmountLabelKeyDown}
          onClickCapture={onAmountLabelClick}
        >
          ${amount}
          <EditIcon style={{ fontSize: 10 }} />
        </span>
      )}
      {editing && (
        <input
          type='number'
          step='0.01'
          lang='en-au'
          ref={input => {
            input && input.focus()
          }}
          onClickCapture={e => e.stopPropagation()}
          style={{ width: '3em' }}
          onKeyDown={onEditKeyDown}
          onBlur={() => {
            setEditing(false)
          }}
          value={amount}
          onChange={onInputChange}
        />
      )}
    </Button>
  )
}
