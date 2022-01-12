import { styled } from '@material-ui/core'

export const LinkUnderlined = styled('a')(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer',
  color: theme.palette.Blue400
}))
