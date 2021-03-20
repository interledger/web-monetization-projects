import React, { useEffect, useState } from 'react'
import { styled, makeStyles } from '@material-ui/core'
import { Colors } from '@coil/extension-popup/theme'

//
// Styles
//
const ComponentWrapper = styled('div')({
  width: '100%'
})

const Countdown = styled('div')({
  fontWeight: 'normal',
  color: Colors.Grey700,
  textAlign: 'center',
  marginBottom: '5px'
})

const Button = styled('button')({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  width: '100%',
  height: '48px',
  backgroundColor: Colors.Grey800,
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#000000'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: Colors.Grey500,
    color: Colors.Grey100
  }
})

const ButtonLabel = styled('div')({
  position: 'absolute',
  zIndex: 9,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  color: 'inherit',
  fontFamily: 'CircularStd',
  fontWeight: 'bold',
  fontSize: '16px',
  letterSpacing: '.5px',
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Fill = styled('div')({
  position: 'absolute',
  zIndex: 8,
  width: '100%',
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: Colors.Grey500
})

//* cannot get the keyframes to work with 'styled' syntax
const useStyles = makeStyles({
  fill: {
    animation: `$fill 5s linear`
  },
  '@keyframes fill': {
    from: { width: '0%' },
    to: { width: '100%' }
  }
})

//
// Models
//

interface IPrimaryButton {
  children: React.ReactNode
  onClick: () => void
  pendingState?: boolean
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
}

//
// Component
//
export const PrimaryButton = (props: IPrimaryButton): React.ReactElement => {
  const [timeRemaining, setTimeRemaining] = useState<number>(5)
  const classes = useStyles()

  let countdownInterval: NodeJS.Timeout
  useEffect(() => {
    countdownInterval = setInterval(updateCoundown, 1000)
    return () => clearInterval(countdownInterval)
  }, [timeRemaining])

  const updateCoundown = () => {
    setTimeRemaining(timeRemaining - 1)
  }

  return (
    <ComponentWrapper>
      {props.pendingState && <Countdown>Sending in {timeRemaining}s</Countdown>}
      <Button onClick={props.onClick} disabled={props.disabled}>
        <ButtonLabel>{props.children}</ButtonLabel>
        {props.pendingState && <Fill className={classes.fill} />}
      </Button>
    </ComponentWrapper>
  )
}
