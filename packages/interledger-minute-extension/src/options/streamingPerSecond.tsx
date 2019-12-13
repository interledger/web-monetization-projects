import {
  createMuiTheme,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core'
import React from 'react'

import { XRPIcon } from '../icons/xrpIcon'
import { Colors, Settings } from '../variables'
import { InfoIcon } from '../icons/infoIcon'

const CustomTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      fontSize: '1.175rem',
      width: '100px'
    },
    '& label.Mui-focused': {
      color: Colors.black
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: Colors.black
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: '2px'
    }
  }
})(TextField)

const useStyles = makeStyles({
  h5: {
    fontSize: '1.25rem',
    margin: '0.1875rem 1rem 0 0'
  },
  infoIcon: {
    marginTop: '0.425rem',
    marginLeft: '0.25rem'
  },
  tooltipWidth: {
    maxWidth: 180
  }
})

const ControlsTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: Colors.white,
    color: Colors.black,
    boxShadow: theme.shadows[0],
    fontFamily: 'Roboto',
    border: `1px solid ${Colors.grey}`,
    fontWeight: 500,
    fontSize: 11,
    padding: '10px',
    borderRadius: 0
  }
}))(Tooltip)

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
