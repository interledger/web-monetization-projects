import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Colors } from '../variables'
import { Logo } from '../logo'

const useStyles = makeStyles({
  header: {
    paddingBottom: '1rem',
    borderBottom: `1px solid ${Colors.greyMid}`
  },
  settings: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    background: Colors.greyLight,
    boxShadow: '0 3px 6px rgba(0,0,0,0.31)'
  },
  settingsIcon: {
    top: '8px',
    left: '8px',
    width: '20px',
    height: '20px',
    position: 'relative'
  },
  heading: {
    fontSize: '2rem',
    paddingLeft: '16px',
    fontWeight: 400
  }
})

export const PopupHeader = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
      className={classes.header}
    >
      <Logo large={false} />
      <Grid item xs>
        <Typography variant='h1' className={classes.heading}>
          Minute
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.settings}>
          <svg
            className={classes.settingsIcon}
            xmlns='http://www.w3.org/2000/svg'
            width='19.477'
            height='19.97'
            viewBox='0 0 19.477 19.97'
            fill={Colors.black}
          >
            <path
              id='settings'
              d='M12,15.516A3.516,3.516,0,1,0,8.484,12,3.542,3.542,0,0,0,12,15.516Zm7.453-2.532,2.109,1.641a.5.5,0,0,1,.094.656L19.64,18.75a.462.462,0,0,1-.609.188l-2.484-.984a7.555,7.555,0,0,1-1.688.984l-.375,2.625a.5.5,0,0,1-.469.422H9.984a.5.5,0,0,1-.469-.422L9.14,18.938a6.145,6.145,0,0,1-1.688-.984l-2.484.984a.46.46,0,0,1-.609-.188L2.343,15.281a.5.5,0,0,1,.094-.656l2.109-1.641A6.9,6.9,0,0,1,4.5,12a6.9,6.9,0,0,1,.047-.984L2.437,9.375a.5.5,0,0,1-.094-.656L4.359,5.25a.462.462,0,0,1,.609-.188l2.484.984A7.555,7.555,0,0,1,9.14,5.062l.375-2.625a.5.5,0,0,1,.469-.422h4.031a.5.5,0,0,1,.469.422l.375,2.625a6.145,6.145,0,0,1,1.688.984l2.484-.984a.46.46,0,0,1,.609.188l2.016,3.469a.5.5,0,0,1-.094.656l-2.109,1.641A6.9,6.9,0,0,1,19.5,12,6.9,6.9,0,0,1,19.453,12.984Z'
              transform='translate(-2.261 -2.015)'
            />
          </svg>
        </div>
      </Grid>
    </Grid>
  )
}
