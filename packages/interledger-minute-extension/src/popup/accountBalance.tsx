import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Colors } from '../variables'

const useStyles = makeStyles({
  wallet: {
    width: '14px',
    height: '14px',
    paddingRight: '6px',
    position: 'relative',
    top: '-2px'
  },
  xrpLogo: {
    width: '10.12px',
    height: '8.78px',
    position: 'relative',
    top: '1'
  },
  creditUsed: {
    fontSize: '12.5px',
    fontWeight: 400,
    lineHeight: 1,
    '& span': {
      color: Colors.grey
    }
  }
})

export const AccountBalance = (props: {
  creditUsed: number
  creditTotal: number
}) => {
  const classes = useStyles()

  return (
    <Grid container direction='row'>
      <div className={classes.wallet}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 11.378'>
          <path
            id='wallet'
            d='M11.207,9.636a.948.948,0,1,0-.948-.948A.936.936,0,0,0,11.207,9.636Zm-2.518,1.57V6.17H15v5.037H8.688Zm5.689,1.274V13.1A1.3,1.3,0,0,1,13.1,14.377H4.273A1.284,1.284,0,0,1,3,13.1V4.273A1.284,1.284,0,0,1,4.273,3H13.1a1.3,1.3,0,0,1,1.274,1.274V4.9H8.688A1.284,1.284,0,0,0,7.414,6.17v5.037a1.284,1.284,0,0,0,1.274,1.274Z'
            transform='translate(-2.999 -2.999)'
          />
        </svg>
      </div>

      <div className={classes.xrpLogo}>
        <svg
          fill={Colors.grey}
          xmlns='http://www.w3.org/2000/svg'
          width='10.119'
          height='8.783'
          viewBox='0 0 10.119 8.783'
        >
          <g
            id='xrp_logo'
            data-name='xrp logo'
            transform='translate(-400 -559.455)'
          >
            <path
              id='Path_6'
              data-name='Path 6'
              d='M8.618,0h1.464L7.037,3.158a2.751,2.751,0,0,1-3.992,0L0,0H1.464L3.777,2.4A1.743,1.743,0,0,0,6.3,2.4Z'
              transform='translate(400.019 559.455)'
            />
            <path
              id='Path_7'
              data-name='Path 7'
              d='M1.464,4.035H0L3.064.857a2.751,2.751,0,0,1,3.992,0l3.064,3.178H8.656L6.324,1.616a1.743,1.743,0,0,0-2.528,0Z'
              transform='translate(400 564.203)'
            />
          </g>
        </svg>
      </div>

      <Typography variant='h6' className={classes.creditUsed}>
        <span>{props.creditUsed}</span>/{props.creditTotal}
      </Typography>
    </Grid>
  )
}
