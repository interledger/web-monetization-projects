import React from 'react'

import { PopupProps } from '../types'
import { useStorage } from '../hooks/useStorage'
import { SetCoilDomain } from '../../types/commands'

export function CoilDomainRadioGroup(props: PopupProps) {
  const { context } = props
  // will bind to localStorage updates
  const coilDomain = useStorage('coilDomain', context) || context.coilDomain

  const options = [
    ['https://coil.com', 'Production'],
    ['https://staging.coil.com', 'Staging'],
    ['http://localhost:3000', 'Local']
  ]

  function optionChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const { value } = changeEvent.target
    const message: SetCoilDomain = {
      command: 'setCoilDomain',
      data: {
        value
      }
    }
    context.runtime.sendMessage(message)
  }

  return (
    <form>
      {options.map(([url, name]) => {
        return (
          <input
            onChange={optionChange}
            value={url}
            key={name}
            type='radio'
            checked={coilDomain === url}
          />
        )
      })}
    </form>
  )
}
