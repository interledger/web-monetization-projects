import { Grid, InputAdornment, Typography } from '@material-ui/core'
import React from 'react'

import { XRPIcon } from '../icons/xrpIcon'
import { Settings } from '../variables'
import { InfoIcon } from '../icons/infoIcon'

import { ControlsTooltip, CustomTextField, useStyles } from './styles'

export const StreamingPerSecond = (props: { limit: number }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      style={{ marginTop: `calc(${Settings.padding}/2` }}
    >
      <Grid item>
        <Typography variant='h5' className={classes.h5}>
          Streaming Per Second
        </Typography>
      </Grid>
      <Grid item>
        <form noValidate autoComplete='off'>
          <CustomTextField
            defaultValue={`${props.limit}μ`}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <XRPIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
      </Grid>
      <Grid item className={classes.infoIcon}>
        <ControlsTooltip
          title='The amount of microdollars to send per second to the website'
          placement='right'
          classes={{ tooltip: classes.tooltipWidth }}
        >
          <div>
            <InfoIcon />
          </div>
        </ControlsTooltip>
      </Grid>
    </Grid>
  )
}
