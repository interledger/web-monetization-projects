import Tab = chrome.tabs.Tab
import MessageSender = chrome.runtime.MessageSender
import { notNullOrUndef } from './nullables'

export function getTabString(sender: { tab?: { id?: number } }): string {
  return getTab(sender).toString()
}

export function getTab(sender: { tab?: { id?: number } }): number {
  return notNullOrUndef(notNullOrUndef(sender.tab).id)
}

export function getFrameId(sender: MessageSender) {
  const tab = notNullOrUndef(sender.tab)
  return `${notNullOrUndef(tab.id)}:${sender.frameId}`
}

export type FullySpecTab = Tab & { status: string; url: string; title: string }
export function assertFullySpec(tab: Tab): asserts tab is FullySpecTab {
  if (!tab.url || !tab.title || !tab.status) {
    throw new Error()
  }
}
