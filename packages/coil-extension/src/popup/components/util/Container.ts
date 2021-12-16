import { styled } from '@material-ui/core'

export const Container = styled('div')(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  textAlign: 'center',
  maxWidth: `${theme.breakpoints.values.lg}px`
}))
