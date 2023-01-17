import { notNullOrUndef } from '../../../util/nullables'

type SetCookie = chrome.cookies.SetDetails

interface SetCookieParams {
  cookie: string
  domainUrl: string
}

function domainFromUrl(url: string) {
  return new URL(url).host
}

export function setCookie({ cookie, domainUrl }: SetCookieParams): SetCookie {
  const split = cookie.split(';')
  const each = split.map(val => val.split('=', 2))
  const [name, value] = notNullOrUndef(each.shift())
  let expirationDate, sameSite, path
  each.forEach(([k, v]) => {
    if (k === 'expires') {
      expirationDate = new Date(v).getTime() / 1e3
    } else if (k === 'path') {
      path = v
    } else if (k === 'samesite') {
      sameSite = v
    }
  })
  return {
    url: `${domainUrl}/extension`,
    domain: domainFromUrl(domainUrl),
    name,
    value,
    sameSite,
    path,
    expirationDate,
    httpOnly: false
  }
}

interface GetCookieParams {
  api: typeof window.chrome
  domainUrl: string
}

export async function getCookie({ api, domainUrl }: GetCookieParams) {
  const cookies = await api.cookies.getAll({ domain: domainFromUrl(domainUrl) })
  const nowSeconds = Date.now() / 1e3
  const relevant = cookies.filter(
    c => !c.httpOnly && (!c.expirationDate || c.expirationDate > nowSeconds)
  )
  return relevant.map(c => `${c.name}=${c.value};`).join(' ')
}
