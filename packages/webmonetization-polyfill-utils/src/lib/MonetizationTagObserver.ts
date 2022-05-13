import { v4 as uuid } from 'uuid'

import { whenDocumentReady } from './whenDocumentReady'
import { CustomError } from './CustomError'

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const debug = (..._: unknown[]) => {}

export interface PaymentDetails {
  requestId: string
  paymentPointer: string
  initiatingUrl: string
}

export enum IDGenerationStrategy {
  PAGE_LOAD,
  META_ADDED_CHANGED
}

/**
 * On a tag removed stopped will be set
 * On a tag added started will be set
 * On a tag[content|href] changed, both will be set
 */
export interface PaymentDetailsChangeArguments {
  started: PaymentDetails | null
  stopped: PaymentDetails | null
}

export type PaymentDetailsChangeCallback = (
  args: PaymentDetailsChangeArguments
) => void

export type MonetizationTag = HTMLMetaElement | HTMLLinkElement
export type MetaList = NodeListOf<MonetizationTag>

export type TagType = 'meta' | 'link'

export function getTagType(tag: MonetizationTag): TagType {
  return tag instanceof HTMLMetaElement ? 'meta' : 'link'
}

export class DeprecatedMetaTagIgnoredError extends CustomError {}

export class MonetizationTagObserver {
  /**
   * This class as written should be used in such a way that it has a lifetime
   * the same as the content script.
   * See {@link IDGenerationStrategy.PAGE_LOAD}
   */
  private readonly pageLoadId = uuid()

  private affinity: TagType = 'meta'
  private head: HTMLHeadElement | null = null
  private headObserver: MutationObserver
  private metaTags = new Map<
    MonetizationTag,
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
  startWhenDocumentReady(): void {
    whenDocumentReady(this.document, this.start.bind(this))
  }

  private start() {
    this.head = this.document.head
    const metas: MetaList = this.head.querySelectorAll(
      'meta[name="monetization"],link[rel="monetization"]'
    )
    metas.forEach(m => {
      try {
        this.onAddedTag(m)
      } catch (e) {
        console.error(e)
      }
    })
    this.headObserver.observe(this.head, { childList: true })
  }

  private onHeadChildListObserved(records: MutationRecord[]) {
    debug('head mutation records.length=', records.length)
    const check = (op: string, node: Node) => {
      debug('head node', op, node)
      if (
        (node instanceof HTMLMetaElement && node.name === 'monetization') ||
        (node instanceof HTMLLinkElement && node.rel === 'monetization')
      ) {
        if (op === 'added') {
          this.onAddedTag(node)
        } else if (op === 'removed') {
          this.onRemovedTag(node)
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

  private onPaymentEndpointChangeObserved(records: MutationRecord[]) {
    for (const record of records) {
      if (
        record.type === 'attributes' &&
        record.attributeName === 'content' &&
        record.target instanceof HTMLMetaElement &&
        record.target['content'] !== record.oldValue
      ) {
        const meta = record.target
        this.onChangedPaymentEndpoint(meta)
      } else if (
        record.type === 'attributes' &&
        record.attributeName === 'href' &&
        record.target instanceof HTMLLinkElement &&
        record.target['href'] !== record.oldValue
      ) {
        this.onChangedPaymentEndpoint(record.target)
      }
    }
  }

  private onAddedTag(meta: MonetizationTag) {
    const type = getTagType(meta)
    if (type != this.affinity) {
      if (type === 'link') {
        this.affinity = 'link'
        for (const tag of this.metaTags.keys()) {
          this.onRemovedTag(tag)
        }
      } else {
        // TODO: just console.warn and return early ?
        throw new DeprecatedMetaTagIgnoredError(
          'Web-Monetization Error: ' +
            'A `<link rel="monetization">` tag has been seen so ' +
            'ignoring deprecated `<meta name="monetization">` tag and ' +
            'using only `<link rel="monetization">` tags consistently'
        )
      }
    }

    const details = this.getPaymentDetails(meta)

    if (this.metaTags.size + 1 > this.maxMetas) {
      throw new Error(
        `Web-Monetization Error: Ignoring tag with ` +
          `paymentPointer=${details.paymentPointer}, only ${this.maxMetas} ` +
          `monetization tag[s] supported at a time. `
      )
    }

    const observer = new MutationObserver(
      this.onPaymentEndpointChangeObserved.bind(this)
    )
    observer.observe(meta, {
      attributeOldValue: true,
      childList: false,
      attributeFilter: [meta instanceof HTMLMetaElement ? 'content' : 'href']
    })
    this.metaTags.set(meta, { observer, details })
    this.callback({ stopped: null, started: details })
  }

  private onRemovedTag(meta: MonetizationTag) {
    const entry = this.getEntry(meta)
    entry.observer.disconnect()
    this.metaTags.delete(meta)
    this.callback({ started: null, stopped: entry.details })
  }

  private getEntry(meta: MonetizationTag) {
    const entry = this.metaTags.get(meta)
    if (!entry) {
      throw new Error('meta not tracked: ' + meta.outerHTML)
    }
    return entry
  }

  private onChangedPaymentEndpoint(meta: MonetizationTag) {
    const entry = this.getEntry(meta)
    const stopped = entry.details
    const started = this.getPaymentDetails(meta)
    entry.details = started
    this.callback({ started, stopped })
  }

  private getPaymentDetails(meta: MonetizationTag): PaymentDetails {
    const paymentPointer =
      meta instanceof HTMLMetaElement ? meta.content : meta.href
    const trimmed = paymentPointer.trim()
    const proxied = `http://localhost:4000/spsp/${encodeURIComponent(trimmed)}`
    return {
      requestId: this.getWebMonetizationId(),
      paymentPointer: trimmed,
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
