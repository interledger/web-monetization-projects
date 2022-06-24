import { BROWSER, LIVE_RELOAD } from './env'

const CHROMIUM_BASED_BROWSER = /chrome|edge/

export function transformStatic(content: Buffer, path: string) {
  if (
    LIVE_RELOAD &&
    BROWSER.match(CHROMIUM_BASED_BROWSER) &&
    path.endsWith('background.html')
  ) {
    return content
      .toString()
      .replace(
        '<!--INSERT_HOT_RELOAD-->',
        '<script src="../hot-reload.js"></script>'
      )
  } else if (
    BROWSER.match(CHROMIUM_BASED_BROWSER) &&
    path.endsWith('popup.html')
  ) {
    return content
      .toString()
      .replace(
        '<!--INSERT_FORCE_REDRAW_SCRIPT-->',
        '<script src="./forceRedraws.js"></script>'
      )
  } else {
    return content
  }
}
