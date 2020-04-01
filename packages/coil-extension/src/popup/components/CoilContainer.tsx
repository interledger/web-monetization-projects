import { styled } from '@material-ui/core'

import { Container } from '../components/util/Container'
import { Colors } from '../../shared-theme/colors'

export const CoilContainer = styled(Container)(({ theme }) => ({
  paddingRight: `${theme.spacing(4)}px`,
  paddingLeft: `${theme.spacing(4)}px`,
  paddingTop: `${theme.spacing(2)}px`,
  paddingBottom: `${theme.spacing(2)}px`,
  backgroundColor: Colors.Grey99
}))
