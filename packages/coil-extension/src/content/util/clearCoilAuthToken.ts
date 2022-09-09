import { COIL_DOMAIN } from '../../webpackDefines'

if (window.top && window.location.href.startsWith(COIL_DOMAIN)) {
  console.warn('Removing auth token')
  delete localStorage.token
}
