import { createMuiTheme } from '@material-ui/core/styles'

import { Colors } from './colors'

const body = {
  fontFamily: 'CircularStd',
  lineHeight: '22px',
  fontWeight: 500,
  letterSpacing: 0,
  fontSize: '14px',
  color: Colors.Grey700
}
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.White,
      main: Colors.Blue,
      contrastText: Colors.White
    },
    secondary: {
      main: Colors.Grey100
    }
  },
  overrides: {
    MuiMenuItem: {
      root: {
        paddingTop: '8px',
        paddingBottom: '8px',
        boxSizing: 'content-box',
        height: '24px'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '64px'
      },
      outlined: {
        borderColor: Colors.Red400
      }
    }
  },
  typography: {
    button: {
      fontFamily: 'CircularStd',
      textTransform: 'none',
      fontWeight: 500
    },
    // headline
    h5: {
      fontFamily: 'CircularStd',
      fontWeight: 700,
      fontSize: '14px',
      color: Colors.Grey500
    },
    h6: {
      fontFamily: 'CircularStd',
      fontWeight: 600,
      fontSize: '20px',
      color: '#223344',
      lineHeight: '28px'
    },
    subtitle2: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#223344'
    },
    subtitle1: {
      // subheading: {
      fontFamily: 'CircularStd',
      lineHeight: '22px',
      fontSize: '14px',
      color: Colors.Grey700
    },
    body1: body,
    body2: body,
    caption: {
      fontFamily: 'CircularStd',
      lineHeight: 'normal',
      fontSize: '14px',
      color: '#000',
      fontWeight: 500
    }
  }
})
