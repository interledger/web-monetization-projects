import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const StatusTypography = styled(Typography)`
  padding-top: ${({ theme }) => theme.spacing(1)}px;
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
`
