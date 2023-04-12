import { create, GenerateId } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/styles'

export const generateClassName: GenerateId = createGenerateClassName()
export const jss = create(jssPreset())

jss.setup()
