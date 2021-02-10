import { styled } from '@material-ui/core'

import { Colors } from '../../shared-theme/colors'

export const TipRule = styled('hr')(() => ({
  border: 0,
  topBorderColor: Colors.Grey89,
  topBorderWidth: '1px'
}))
