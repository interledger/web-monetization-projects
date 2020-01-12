import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

import { Colors, Settings } from '../variables'
import { theme } from '../theme'

const useStyles = makeStyles({
  label: {
    margin: '0.5rem 0.5rem 0.5rem 0',
    borderRadius: '8px',
    padding: `calc(${Settings.padding}/2)`,
    boxShadow: '0 2px 6px rgba(0,0,0,0.16)',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  h5: {
    color: Colors.grey,
    fontSize: '1.25rem',
    fontWeight: 400,
    padding: '0 1rem 0 0.5rem'
  },
  icon: {
    marginTop: '6px',
    '& img': {
      width: '16px',
      height: 'auto'
    }
  },
  url: {
    flex: 1
  },
  button: {
    padding: '0.4rem 0.75rem 0.375rem 0.75rem',
    color: Colors.white,
    marginTop: '1px',
    fontSize: '13px',
    lineHeight: '1',
    borderRadius: '20px',
    background: Colors.green,
    boxShadow: 'none',
    '&:hover': {
      background: Colors.black
    }
  }
})

export const BlockedWebsite = (props: { icon: string; url: string }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.label}>
      <Grid container direction='row'>
        <Grid item className={classes.icon}>
          <img src={props.icon} />
        </Grid>
        <Grid item className={classes.url}>
          <Typography variant='h5' className={classes.h5}>
            {props.url}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant='contained' className={classes.button}>
            UNBLOCK
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
