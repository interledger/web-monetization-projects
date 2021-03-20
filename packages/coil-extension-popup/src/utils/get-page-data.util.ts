export const getPageFaviconPath = (): string => {
  const iconRef = document
    .querySelector("link[rel*='icon']")
    ?.getAttribute('href')
  const host = window.location.href.slice(0, -1)
  const fullPath = host + iconRef
  return fullPath
}

export const getPageHost = (): string => {
  return window.location.host
}

export const getPageTitle = (): string => {
  return window.document.title
}
