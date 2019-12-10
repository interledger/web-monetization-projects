import React from 'react'
import { makeStyles } from '@material-ui/core'

import { Colors } from '../variables'

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

export const PauseButton = () => {
  const classes = useStyles()

  return (
    <div className={classes.pauseButton}>
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
    </div>
  )
}
