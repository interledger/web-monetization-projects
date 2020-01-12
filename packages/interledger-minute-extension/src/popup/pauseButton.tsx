import React from 'react'
import { makeStyles } from '@material-ui/core'

import { Colors, Settings } from '../variables'

const useStyles = makeStyles({
  pauseButton: {
    width: '60px',
    height: '60px',
    margin: '0 12px',
    '& span': {
      color: Colors.grey
    }
  }
})

const PlayIconSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58.5 58.5'>
      <path
        className='playSvg'
        id='play'
        d='M45.094,61.25a2.371,2.371,0,0,1-1.219,2.095L23.156,75.532a2.363,2.363,0,0,1-1.219.343,2.748,2.748,0,0,1-1.219-.3A2.477,2.477,0,0,1,19.5,73.438V49.063a2.477,2.477,0,0,1,1.219-2.133,2.424,2.424,0,0,1,2.438.038L43.875,59.155A2.371,2.371,0,0,1,45.094,61.25Zm4.875,0A20.719,20.719,0,1,0,29.25,81.969,20.74,20.74,0,0,0,49.969,61.25Zm8.531,0A29.25,29.25,0,1,1,29.25,32,29.258,29.258,0,0,1,58.5,61.25Z'
        transform='translate(0 -32)'
        fill={Colors.green}
      />
    </svg>
  )
}

const PauseIconSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 58.498 58.498'
      fill={Colors.black}
    >
      <path
        id='pause'
        d='M29.249,2A29.249,29.249,0,1,1,0,31.249,29.257,29.257,0,0,1,29.249,2Zm0,49.967A20.718,20.718,0,1,0,8.531,31.249,20.74,20.74,0,0,0,29.249,51.967Zm3.656-8.531a1.2,1.2,0,0,1-1.219-1.219V20.281a1.2,1.2,0,0,1,1.219-1.219h7.312a1.2,1.2,0,0,1,1.219,1.219V42.218a1.2,1.2,0,0,1-1.219,1.219Zm-14.625,0a1.2,1.2,0,0,1-1.219-1.219V20.281a1.2,1.2,0,0,1,1.219-1.219h7.312a1.2,1.2,0,0,1,1.219,1.219V42.218a1.2,1.2,0,0,1-1.219,1.219Z'
        transform='translate(0 -2)'
      />
    </svg>
  )
}

const PlayOrPause = styled.a`
  &.paused,
  &.pause,
  &.playing {
    height: 60px;
    width: 60px;
    display: block;
    margin: 0 12px;
    transition: ${Settings.buttonTransition};
    .pauseSvg {
      transition: ${Settings.buttonTransition};
      fill: ${Colors.black};
    }
    :hover {
      color: ${Colors.greyMid};
    }
  }
  &.playing {
    .playSvg {
      fill: ${Colors.black};
    }
  }
`

export const PauseButton = (props: { iconState: string }) => {
  const classes = useStyles()

  return (
    <PlayOrPause className={props.iconState}>
      {props.iconState === 'playing' ? <PlayIconSvg /> : <PauseIconSvg />}
    </PlayOrPause>
    // <div className={classes.pauseButton}>
    //   <svg
    //     xmlns='http://www.w3.org/2000/svg'
    //     viewBox='0 0 58.498 58.498'
    //     fill={Colors.black}
    //   >
    //     <path
    //       id='pause'
    //       d='M29.249,2A29.249,29.249,0,1,1,0,31.249,29.257,29.257,0,0,1,29.249,2Zm0,49.967A20.718,20.718,0,1,0,8.531,31.249,20.74,20.74,0,0,0,29.249,51.967Zm3.656-8.531a1.2,1.2,0,0,1-1.219-1.219V20.281a1.2,1.2,0,0,1,1.219-1.219h7.312a1.2,1.2,0,0,1,1.219,1.219V42.218a1.2,1.2,0,0,1-1.219,1.219Zm-14.625,0a1.2,1.2,0,0,1-1.219-1.219V20.281a1.2,1.2,0,0,1,1.219-1.219h7.312a1.2,1.2,0,0,1,1.219,1.219V42.218a1.2,1.2,0,0,1-1.219,1.219Z'
    //       transform='translate(0 -2)'
    //     />
    //   </svg>
    // </div>
  )
}
