import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Colors } from '../variables'

const useStyles = makeStyles({
  message: {
    color: Colors.black,
    fontSize: '16px',
    fontWeight: 400,
    '& strong': {
      fontWeight: 500
    }
  },
  status: {
    width: '24px',
    height: '24px',
    marginRight: '6px'
  }
})

export const MonetizedStatus = (props: { status: boolean }) => {
  const classes = useStyles()

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Grid item className={classes.status}>
        {props.status ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              id='tick'
              d='M20.062,11.469a1.019,1.019,0,0,0-.281-.719L18.359,9.344a.981.981,0,0,0-1.406,0L10.578,15.7,7.047,12.172a.981.981,0,0,0-1.406,0L4.219,13.578a1.017,1.017,0,0,0-.281.719.979.979,0,0,0,.281.7l5.656,5.656a1,1,0,0,0,1.422,0l8.484-8.484A.981.981,0,0,0,20.062,11.469ZM24,14A12,12,0,1,1,12,2,12,12,0,0,1,24,14Z'
              transform='translate(0 -2)'
              fill={Colors.green}
            />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              id='cancel'
              d='M108,120a12,12,0,1,1,12-12A12,12,0,0,1,108,120Zm5.5-15.5a.578.578,0,0,0,0-.817l-1.226-1.225a.578.578,0,0,0-.817,0l-3.472,3.472-3.472-3.472a.578.578,0,0,0-.817,0l-1.226,1.225a.578.578,0,0,0,0,.817l3.473,3.473-3.473,3.471a.578.578,0,0,0,0,.817l1.226,1.226a.578.578,0,0,0,.817,0l3.472-3.473,3.472,3.473a.578.578,0,0,0,.817,0l1.226-1.226a.578.578,0,0,0,0-.817l-3.473-3.471Z'
              transform='translate(-96 -96)'
              fill={Colors.red}
            />
          </svg>
        )}
      </Grid>
      <Grid item>
        <Typography variant='h4' className={classes.message}>
          This page {props.status ? 'is' : 'is not'}{' '}
          <strong>Web-Monetized</strong>
        </Typography>
      </Grid>
    </Grid>
  )
}
