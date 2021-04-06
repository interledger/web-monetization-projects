import { styled } from '@material-ui/core'

import { Colors } from '../../../shared-theme/colors'

export const Link = styled('a')({
  textDecoration: 'none',
  color: Colors.Blue400
})

export const LinkUnderlined = styled('a')({
  textDecoration: 'underline',
  cursor: 'pointer',
  color: Colors.Blue400,
  fontWeight: 500
})
