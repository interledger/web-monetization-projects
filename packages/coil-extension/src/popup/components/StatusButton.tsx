import React from 'react'
import { Button, styled } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'

type ButtonType = React.FunctionComponent<ButtonProps & { target: string }>

const ButtonWithMargin = styled(Button as ButtonType)({
  margin: '1em',
  boxShadow: 'none',
  borderRadius: '6px',
  padding: '12px 58px'
})

export const StatusButton = (props: { text: string } & ButtonProps) => {
  const { text } = props
  return (
    <ButtonWithMargin size='medium' color='primary' target='_blank' {...props}>
      {text}
    </ButtonWithMargin>
  )
}
