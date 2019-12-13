import { makeStyles, TextField, Tooltip, withStyles } from '@material-ui/core'

import { Colors } from '../variables'

export const CustomTextField = withStyles({
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

export const useStyles = makeStyles({
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

export const ControlsTooltip = withStyles(theme => ({
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
