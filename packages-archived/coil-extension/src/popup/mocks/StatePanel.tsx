import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'

import { PopupStateType } from '../services/PopupState'

const useStyles = makeStyles(theme => {
  return {
    root: {
      paddingLeft: '1rem',
      position: 'fixed'
    },
    heading: {
      fontSize: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightBold,
      padding: '1.75rem 0',
      variant: 'h2'
    },
    body: {
      background: '#222',
      borderRadius: '0.25rem',
      padding: '0.5rem'
    },
    type: {
      fontSize: '0.75rem',
      color: '#EEE',
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      overflowWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      overflowX: 'auto'
    },
    [theme.breakpoints.down('md')]: {
      root: {
        position: 'relative'
      }
    }
  } as const
})

export const StatePanel = (props: {
  parent: React.MutableRefObject<HTMLDivElement | null>
  heading: string
  body: PopupStateType
}) => {
  const classes = useStyles()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (props.parent.current) {
        const rem = 16
        const threeRems = rem * 3
        setWidth(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parseInt(getComputedStyle(props.parent.current).width!) - threeRems
        )
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Grid style={{ width: `${width}px` }} container className={classes.root}>
      <Typography className={classes.heading}>{props.heading}</Typography>
      <Grid item xs={12} className={classes.body}>
        <pre className={classes.type}>
          {JSON.stringify(props.body, null, 2)}
        </pre>
      </Grid>
    </Grid>
  )
}
