import reduct from 'reduct'

import { MonetizationPolyfill } from './MonetizationPolyfill'
import { getDoc } from './documentExtensions'

getDoc().coilMonetizationPolyfill = reduct()(MonetizationPolyfill)
