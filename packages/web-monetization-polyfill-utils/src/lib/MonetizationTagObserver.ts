import { v4 as uuid } from 'uuid'

import { whenDocumentReady } from './whenDocumentReady'

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const debug = (...args: unknown[]) => {}

export interface PaymentDetails {
  requestId: string
  paymentPointer: string
  initiatingUrl: string
}

export enum IDGenerationStrategy {
  PAGE_LOAD,
  META_ADDED_CHANGED
}

export type MetaList = NodeListOf<HTMLMetaElement>

/**
 * On a meta removed stopped will be set
 * On a meta added started will be set
 * On a meta[content] changed, both will be set
 */
export interface PaymentDetailsChangeArguments {
  started: PaymentDetails | null
  stopped: PaymentDetails | null
}

export type PaymentDetailsChangeCallback = (
  args: PaymentDetailsChangeArguments
) => void

export class MonetizationTagObserver {
  /**
   * This class as written should be used in such a way that it has a lifetime
   * the same as the content script.
   * See {@link IDGenerationStrategy.PAGE_LOAD}
   */
  private readonly pageLoadId = uuid()

  private head: HTMLHeadElement | null = null
  private headObserver: MutationObserver
  private metaTags = new Map<
    HTMLMetaElement,
    {
      details: PaymentDetails
      observer: MutationObserver
    }
  >()

  constructor(
    private window: Window,
    private document: HTMLDocument,
    private callback: PaymentDetailsChangeCallback,
    private maxMetas = 1,
    private idGenerationStrategy = IDGenerationStrategy.META_ADDED_CHANGED
  ) {
    this.headObserver = new MutationObserver(
      this.onHeadChildListObserved.bind(this)
    )
  }

  /**
   * The head will be null early on so we must wait
   */
  startWhenDocumentReady() {
    whenDocumentReady(this.document, this.start.bind(this))
  }

  private start() {
    this.head = this.document.head
    const metas: MetaList = this.head.querySelectorAll(
      'meta[name="monetization"]'
    )
    metas.forEach(this.onAddedMeta.bind(this))
    this.headObserver.observe(this.head, { childList: true })
  }

  private onHeadChildListObserved(records: MutationRecord[]) {
    debug('head mutation records.length=', records.length)
    const check = (op: string, node: Node) => {
      debug('head node', op, node)
      if (node instanceof HTMLMetaElement && node.name === 'monetization') {
        if (op === 'added') {
          this.onAddedMeta(node)
        } else if (op === 'removed') {
          this.onRemovedMeta(node)
        }
      }
    }

    // Explicitly remove these first
    for (const record of records) {
      debug('Record', record.type, record.target)
      if (record.type === 'childList') {
        record.removedNodes.forEach(check.bind(null, 'removed'))
      }
    }

    for (const record of records) {
      debug('Record', record.type, record.target)
      if (record.type === 'childList') {
        record.addedNodes.forEach(check.bind(null, 'added'))
      }
    }
  }

  private onMetaContentChangeObserved(records: MutationRecord[]) {
    for (const record of records) {
      if (
        record.type === 'attributes' &&
        record.attributeName === 'content' &&
        record.target instanceof HTMLMetaElement &&
        record.target['content'] !== record.oldValue
      ) {
        const meta = record.target
        this.onChangedMetaContent(meta)
      }
    }
  }

  private onAddedMeta(meta: HTMLMetaElement) {
    const details = this.getPaymentDetails(meta)
    const observer = new MutationObserver(
      this.onMetaContentChangeObserved.bind(this)
    )
    observer.observe(meta, {
      attributeOldValue: true,
      childList: false,
      attributeFilter: ['content']
    })
    this.metaTags.set(meta, { observer, details })
    if (this.metaTags.size > this.maxMetas) {
      throw new Error(`Only ${this.maxMetas} monetization tags supported`)
    }
    this.callback({ stopped: null, started: details })
  }

  private onRemovedMeta(meta: HTMLMetaElement) {
    const entry = this.getEntry(meta)
    entry.observer.disconnect()
    this.metaTags.delete(meta)
    this.callback({ started: null, stopped: entry.details })
  }

  private getEntry(meta: HTMLMetaElement) {
    const entry = this.metaTags.get(meta)
    if (!entry) {
      throw new Error('meta not tracked: ' + meta.outerHTML)
    }
    return entry
  }

  private onChangedMetaContent(meta: HTMLMetaElement) {
    const entry = this.getEntry(meta)
    const stopped = entry.details
    const started = this.getPaymentDetails(meta)
    entry.details = started
    this.callback({ started, stopped })
  }

  private getPaymentDetails(meta: HTMLMetaElement): PaymentDetails {
    return {
      requestId: this.getWebMonetizationId(),
      paymentPointer: meta.content,
      initiatingUrl: this.window.location.href
    }
  }

  private getWebMonetizationId(): string {
    if (this.idGenerationStrategy === IDGenerationStrategy.PAGE_LOAD) {
      return this.pageLoadId
    } else if (
      this.idGenerationStrategy === IDGenerationStrategy.META_ADDED_CHANGED
    ) {
      return uuid()
    } else {
      throw new Error()
    }
  }
}
