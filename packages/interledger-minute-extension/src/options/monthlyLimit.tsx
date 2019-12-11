import {
  createMuiTheme,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
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
  }
})

export const MonthlyLimit = (props: { limit: number }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      style={{ marginTop: `calc(${Settings.padding}/2` }}
    >
      <Grid item>
        <Typography variant='h5' className={classes.h5}>
          Monthly Limit
        </Typography>
      </Grid>
      <Grid item>
        <form noValidate autoComplete='off'>
          <CustomTextField
            defaultValue={props.limit}
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
        <InfoIcon />
      </Grid>
    </Grid>
  )
}
