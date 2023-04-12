export function openTab(api: typeof window.chrome, url: string) {
  api.tabs.query({ currentWindow: true }, tabs => {
    const existingTab = tabs.find(el => {
      return el.url === url
    })
    if (existingTab == null) {
      api.tabs.create({ url })
    } else if (existingTab.id != null) {
      // Active needed on Samsung Internet
      api.tabs.update(existingTab.id, { highlighted: true, active: true })
    }
  })
}
