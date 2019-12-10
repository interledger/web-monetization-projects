import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Colors } from '../variables'

const useStyles = makeStyles({
  '@keyframes rotate': {
    to: {
      transform: 'rotateZ(360deg)'
    }
  },
  header: {
    paddingBottom: '1rem',
    borderBottom: `1px solid ${Colors.greyMid}`
  },
  logo: {
    width: '41px',
    height: '41px',
    position: 'relative'
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
  logoRing: {
    width: '41px',
    height: '41px',
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: '50% 50%',
    animationName: '$rotate',
    animationDuration: '60s',
    animationTimingFunction: 'steps(60)',
    animationIterationCount: 'infinite',
    transition: 'transform 0.2s cubic-bezier(.4,2.08,.55,.44)'
  },
  logoM: {
    width: '13.172px',
    height: '13.89px',
    position: 'absolute',
    top: '13px',
    left: '14px'
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
      <Grid item className={classes.logo}>
        <div className={classes.logoRing}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40.988'
            height='40.988'
            viewBox='0 0 40.988 40.988'
            fill={Colors.black}
          >
            <g id='logo-circle' transform='translate(-1361 -157)'>
              <path
                id='arrow'
                d='M13.825,21.8l2.56-4.434a.294.294,0,0,0-.255-.441H11.011a.294.294,0,0,0-.255.441l2.56,4.434A.3.3,0,0,0,13.825,21.8Z'
                transform='translate(1367.924 171.167)'
              />
              <path
                id='ring'
                d='M22.617,38.729A16.454,16.454,0,1,0,6.163,22.274,16.509,16.509,0,0,0,22.617,38.729Zm0-36.949A20.494,20.494,0,1,1,2.123,22.274,20.45,20.45,0,0,1,22.617,1.78Z'
                transform='translate(1358.877 155.22)'
              />
            </g>
          </svg>
        </div>

        <div className={classes.logoM}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='13.172'
            height='13.892'
            viewBox='0 0 13.172 13.892'
            fill={Colors.black}
          >
            <path
              id='logo-m'
              d='M12.7,19l-2.19-8.7v9.429a1.726,1.726,0,0,1-.348,1.175,1.283,1.283,0,0,1-1.841,0,1.7,1.7,0,0,1-.353-1.178V8.915a1.353,1.353,0,0,1,.466-1.207A2.228,2.228,0,0,1,9.689,7.4h.857a3.256,3.256,0,0,1,1.123.14.94.94,0,0,1,.517.5,7.862,7.862,0,0,1,.382,1.183L14.551,16.7l1.984-7.483a7.862,7.862,0,0,1,.382-1.183.94.94,0,0,1,.517-.5,3.256,3.256,0,0,1,1.123-.14h.857a2.228,2.228,0,0,1,1.258.312,1.353,1.353,0,0,1,.466,1.207V19.722a1.726,1.726,0,0,1-.348,1.175,1.2,1.2,0,0,1-.937.391,1.167,1.167,0,0,1-.9-.391,1.71,1.71,0,0,1-.353-1.175V10.293L16.405,19c-.143.566-.259.979-.35,1.243a1.732,1.732,0,0,1-.5.723,1.457,1.457,0,0,1-1.007.326,1.472,1.472,0,0,1-1.34-.746,3.013,3.013,0,0,1-.294-.722Q12.809,19.425,12.7,19Z'
              transform='translate(-7.965 -7.396)'
            />
          </svg>
        </div>
      </Grid>
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
