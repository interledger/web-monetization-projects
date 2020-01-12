import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Colors } from '../variables'

const useStyles = makeStyles({
  arrow: {
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
  rate: {
    fontSize: '12.5px',
    fontWeight: 400,
    lineHeight: 1
  }
})

export const StreamRate = (props: { rate: number }) => {
  const classes = useStyles()

  return (
    <Grid container direction='row'>
      <div className={classes.arrow}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 12 12'
          fill={Colors.black}
        >
          <path
            id='arrow-circle'
            d='M9,8a.259.259,0,0,1-.07.179l-2.5,2.5a.26.26,0,0,1-.179.071A.257.257,0,0,1,6,10.5V9H3.25A.257.257,0,0,1,3,8.75V7.25A.257.257,0,0,1,3.25,7H6V5.5a.247.247,0,0,1,.25-.25.289.289,0,0,1,.188.078L8.93,7.82A.26.26,0,0,1,9,8Zm1.25,0A4.25,4.25,0,1,0,6,12.25,4.254,4.254,0,0,0,10.25,8ZM12,8A6,6,0,1,1,6,2,6,6,0,0,1,12,8Z'
            transform='translate(0 -2)'
          />
        </svg>
      </div>

      <div className={classes.xrpLogo}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill={Colors.black}
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

      <Typography variant='h6' className={classes.rate}>
        {props.rate}μ/sec
      </Typography>
    </Grid>
  )
}
