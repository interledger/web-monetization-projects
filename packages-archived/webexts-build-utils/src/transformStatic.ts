import { BROWSER, LIVE_RELOAD, MV3 } from './env'

const LIVE_RELOAD_BROWSERS = /chrome|edge/

export function transformStatic(content: Buffer, path: string) {
  if (
    LIVE_RELOAD &&
    BROWSER.match(LIVE_RELOAD_BROWSERS) &&
    path.endsWith('background.html')
  ) {
    return content
      .toString()
      .replace(
        '<!--INSERT_HOT_RELOAD-->',
        '<script src="../hot-reload.js"></script>'
      )
  } else if (path.endsWith('popup.html')) {
    let returnVal: Buffer | string = content
    if (BROWSER.match(LIVE_RELOAD_BROWSERS)) {
      returnVal = content
        .toString()
        .replace(
          '<!--INSERT_FORCE_REDRAW_SCRIPT-->',
          '<script src="./forceRedraws.js"></script>'
        )
    }
    if (MV3) {
      returnVal = returnVal
        .toString()
        .replace(
          '<script src="../popup.js"></script>',
          '<script src="../popupMV3.js"></script>'
        )
    }
    return returnVal
  } else {
    return content
  }
}
