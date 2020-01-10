import React from 'react'
import { makeStyles } from '@material-ui/core'

import { Colors } from '../shared-theme/colors'

// styles for responsiveness
const useStyles = makeStyles(theme => {
  return {
    bar: {
      margin: '8px 16px 8px 0',
      borderRadius: '12px',
      padding: '2px',
      border: `2px solid ${Colors.Grey89}`,
      background: Colors.Grey50
    },
    level: {
      borderRadius: '8px',
      height: '8px',
      background: Colors.Red400
    },
    [theme.breakpoints.up('sm')]: {
      bar: {
        marginRight: 0
      }
    }
  } as const
})

export const PageTimeBar = (props: { total: number; fraction: number }) => {
  const classes = useStyles()
  const width = (props.fraction / props.total) * 100
  return (
    <div className={classes.bar}>
      <div className={classes.level} style={{ width: width + '%' }} />
    </div>
  )
}
