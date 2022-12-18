import { create, GenerateId } from 'jss'
import { createGenerateClassName, jssPreset } from '@mui/styles'

export const generateClassName: GenerateId = createGenerateClassName()
export const jss = create(jssPreset())

jss.setup()
