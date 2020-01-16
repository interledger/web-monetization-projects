import Tab = chrome.tabs.Tab
import { notNullOrUndef } from './nullables'

export function getTab(sender: { tab?: { id?: number } }) {
  return notNullOrUndef(notNullOrUndef(sender.tab).id)
}

export type FullySpecTab = Tab & { status: string; url: string; title: string }
export function assertFullySpec(tab: Tab): asserts tab is FullySpecTab {
  if (!tab.url || !tab.title || !tab.status) {
    throw new Error()
  }
}
