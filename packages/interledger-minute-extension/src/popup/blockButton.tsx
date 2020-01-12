import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

import { Colors } from '../variables'

const useStyles = makeStyles({
  blockButton: {
    width: '60px',
    height: '60px',
    margin: '0 12px',
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
    '& span': {
      color: Colors.grey
    },
    '& :hover': {
      '& .path': {
        fill: Colors.red
      }
    }
  }
})

export const BlockButton = (props: { isBlocked: boolean }) => {
  const classes = useStyles()
  const [isBlocked, setIsBlocked] = useState(props.isBlocked)

  return (
    <div
      className={classes.blockButton}
      onClick={() => setIsBlocked(!isBlocked)}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58.977 59.169'>
        <path
          className='path'
          id='block'
          d='M50.376,31.487a20.759,20.759,0,0,0-3.34-11.326L18.086,49.074A20.853,20.853,0,0,0,50.379,31.489ZM12.019,42.968l28.99-28.95a20.5,20.5,0,0,0-11.52-3.494A20.97,20.97,0,0,0,12.019,42.968ZM58.977,31.487A29.489,29.489,0,1,1,29.489,1.922,29.546,29.546,0,0,1,58.977,31.487Z'
          transform='translate(0 -1.922)'
          fill={isBlocked ? Colors.red : Colors.grey}
        />
      </svg>
    </div>
  )
}
