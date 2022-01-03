import { v4 as uuid } from 'uuid'

import { whenDocumentReady } from './whenDocumentReady'
import { CustomError } from './CustomError'

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const debug =
  // console.log.bind(console, 'MonetizationTagManager')
  (...args: unknown[]) => {}

export interface PaymentDetails {
  requestId: string
  paymentPointer: string
  initiatingUrl: string
  fromBody: boolean
  tagType: TagType
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
  // paused / disabled ? .... no, just create a new requestId,
  // fire stopped on disabled ofc
}

export type PaymentDetailsChangeCallback = (
  args: PaymentDetailsChangeArguments
) => void

export type MonetizationTag = HTMLMetaElement | HTMLLinkElement
export type MonetizationTagList = NodeListOf<MonetizationTag>

export type TagType = 'meta' | 'link'

export function getTagType(tag: MonetizationTag): TagType {
  return tag instanceof HTMLMetaElement ? 'meta' : 'link'
}

export class DeprecatedMetaTagIgnoredError extends CustomError {}

interface FireOnMonetizationChangeIfHaveAttributeParams {
  node: HTMLElement
  force?: boolean
}

export const metaDeprecatedMessage =
  'Web-Monetization Error: ' +
  'A `<link rel="monetization">` tag has been seen, so ' +
  'ignoring deprecated `<meta name="monetization">` tag and ' +
  'using only `<link rel="monetization">` tags consistently'

export const MonetizationTagAttrs = {
  meta: ['content', 'name'],
  link: ['href', 'disabled', 'rel', 'crossorigin', 'type']
}

export class MonetizationTagManager {
  /**
   * This class as written should be used in such a way that it has a lifetime
   * the same as the content script.
   * See {@link IDGenerationStrategy.PAGE_LOAD}
   */
  private readonly pageLoadId = uuid()

  private affinity: TagType = 'meta'

  private headObserver: MutationObserver
  private onMonetizationAttrObserver: MutationObserver

  private monetizationTags = new Map<
    MonetizationTag,
    {
      details: PaymentDetails
      observer: MutationObserver
      attrs: Record<string, string | null>
    }
  >()

  private linkTagsById = new Map<string, WeakRef<HTMLLinkElement>>()

  dispatchLinkEventByLinkId(id: string, event: Event) {
    const ref = this.linkTagsById.get(id)
    const link = ref?.deref()
    if (link) {
      // debug('dispatchLinkEventByLinkId', id, event)
      link.dispatchEvent(event)
    }
  }

  linkTagIds(): string[] {
    return Array.from(this.linkTagsById.keys())
  }

  isLinkTag(id: string) {
    return Boolean(this.linkTagsById.has(id))
  }

  constructor(
    private window: Window,
    private document: Document,
    private callback: PaymentDetailsChangeCallback,
    private maxMetas = 1,
    private idGenerationStrategy = IDGenerationStrategy.META_ADDED_CHANGED
  ) {
    this.headObserver = new MutationObserver(
      this.onHeadChildListObserved.bind(this)
    )
    this.onMonetizationAttrObserver = new MutationObserver(
      this.onOnMonetizationChangeObserved.bind(this)
    )
  }

  /**
   * The head will be null early on, so we must wait
   */
  startWhenDocumentReady(): void {
    whenDocumentReady(this.document, this.start.bind(this))
  }

  start() {
    const monetizationTags: MonetizationTagList =
      this.document.querySelectorAll(
        'meta[name="monetization"],link[rel="monetization"]'
      )
    monetizationTags.forEach(m => {
      try {
        this.onAddedTag(m)
      } catch (e) {
        console.error(e)
      }
    })
    const onMonetizations =
      this.document.querySelectorAll<HTMLElement>('[onmonetization]')
    onMonetizations.forEach(om => {
      try {
        this.checkMonetizationAttr(om)
      } catch (e) {
        console.error(e)
      }
    })
    this.headObserver.observe(this.document, { subtree: true, childList: true })
  }

  private onHeadChildListObserved(records: MutationRecord[]) {
    debug('head mutation records.length=', records.length)
    const check = (op: string, node: Node) => {
      debug('head node', op, node)
      // TODO: track all tags where name/rel is either not set or is
      //  monetization. It doesn't seem likely that a tag would change type from
      // stylesheet to monetization.
      // That would really complicate onAddedTag though
      if (
        (node instanceof HTMLMetaElement &&
          /*!node.name ||*/ node.name === 'monetization') ||
        (node instanceof HTMLLinkElement &&
          /*!node.rel || */ node.rel === 'monetization')
      ) {
        if (op === 'added') {
          this.onAddedTag(node)
        } else if (op === 'removed') {
          this.onRemovedTag(node)
        }
      }
      if (op === 'added' && node instanceof HTMLElement) {
        this.checkMonetizationAttr(node)
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

  onMonetizationTagAttributesChange(records: MutationRecord[]) {
    // TODO:WM2 link tag href could change to something nonsense
    // record >> [S] << ... what about the case of href and disabled changing
    // at the same time ?, then onChangedPaymentEndpoint would be fired more
    // than once.
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
      } else if (
        record.type === 'attributes' &&
        record.attributeName === 'disabled' &&
        record.target instanceof HTMLLinkElement &&
        // can't use record.target[disabled] as it's a Boolean not string
        record.target.getAttribute('disabled') !== record.oldValue
      ) {
        const wasDisabled = record.oldValue !== null
        const isDisabled = record.target.hasAttribute('disabled')
        if (wasDisabled != isDisabled) {
          this.onChangedPaymentEndpoint(record.target, isDisabled, wasDisabled)
        }
      }
    }
  }

  /**
   *
   * @param tag - HTMLLinkElement or HTMLMetaElement
   *
   * Checks tag type to set affinity - link or meta
   * Tracks link by requestId
   * Checks invariants - no meta in head
   *                   - no more than one meta
   *                   - no metas when affinity with links already set
   * Sets up attributes observer
   */
  private onAddedTag(tag: MonetizationTag) {
    const type = getTagType(tag)
    if (type != this.affinity) {
      if (type === 'link') {
        this.affinity = 'link'
        for (const tag of this.monetizationTags.keys()) {
          this.onRemovedTag(tag)
        }
      } else {
        throw new DeprecatedMetaTagIgnoredError(metaDeprecatedMessage)
      }
    }

    const details = this.getPaymentDetails(tag)
    if (details.fromBody && details.tagType === 'meta') {
      throw new Error(
        'Web-Monetization Error: <meta name="monetization"> ' +
          'must be in the document head'
      )
    }
    if (
      details.tagType === 'meta' /*|| details.tagType === 'link'*/ &&
      this.monetizationTags.size + 1 > this.maxMetas
    ) {
      throw new Error(
        `Web-Monetization Error: Ignoring tag with ` +
          `paymentPointer=${details.paymentPointer}, only ${this.maxMetas} ` +
          `monetization tag[s] supported at a time. `
      )
    }

    const observer = new MutationObserver(
      this.onMonetizationTagAttributesChange.bind(this)
    )
    observer.observe(tag, {
      attributeOldValue: true,
      childList: false,
      attributeFilter:
        details.tagType === 'meta'
          ? MonetizationTagAttrs.meta
          : MonetizationTagAttrs.link
    })
    if (details.tagType === 'link') {
      this.linkTagsById.set(
        details.requestId,
        new WeakRef(tag as HTMLLinkElement)
      )
    }

    const attrs = Object.fromEntries(
      MonetizationTagAttrs[details.tagType].map(attr => {
        return [attr, tag.getAttribute(attr)]
      })
    )
    this.monetizationTags.set(tag, { observer, details, attrs })
    if (tag instanceof HTMLLinkElement && tag.hasAttribute('disabled')) {
      return
    } else {
      this.callback({ stopped: null, started: details })
    }
  }

  private onRemovedTag(meta: MonetizationTag) {
    const entry = this.getEntry(meta)
    entry.observer.disconnect()
    this.monetizationTags.delete(meta)
    this.clearLinkById(entry.details)
    this.callback({ started: null, stopped: entry.details })
  }

  private getEntry(meta: MonetizationTag) {
    const entry = this.monetizationTags.get(meta)
    if (!entry) {
      throw new Error('meta not tracked: ' + meta.outerHTML)
    }
    return entry
  }

  onChangedPaymentEndpoint(
    tag: MonetizationTag,
    disabled = false,
    wasDisabled = false
  ) {
    const entry = this.getEntry(tag)
    const stopped = wasDisabled ? null : entry.details
    this.clearLinkById(entry.details)
    let started: PaymentDetails | null = null
    if (!disabled) {
      started = this.getPaymentDetails(tag)
      entry.details = started
      if (started.tagType === 'link') {
        const linkRef = new WeakRef(tag as HTMLLinkElement)
        this.linkTagsById.set(started.requestId, linkRef)
      }
    }
    this.callback({ started, stopped })
  }

  private clearLinkById(stopped: PaymentDetails) {
    if (stopped.tagType === 'link') {
      this.linkTagsById.delete(stopped.requestId)
    }
  }

  private getPaymentDetails(meta: MonetizationTag): PaymentDetails {
    const paymentPointer =
      meta instanceof HTMLMetaElement ? meta.content : meta.href
    return {
      requestId: this.getWebMonetizationId(),
      paymentPointer: paymentPointer.trim(),
      initiatingUrl: this.window.location.href,
      tagType: getTagType(meta),
      fromBody: meta.parentElement != this.document.head
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

  private checkMonetizationAttr(node: HTMLElement) {
    debug('checkMonetizationAttr', node)
    this.fireOnMonetizationChangeIfHaveAttribute({ node })
    this.onMonetizationAttrObserver.observe(node, {
      childList: false,
      attributeFilter: ['onmonetization']
    })
  }

  private onOnMonetizationChangeObserved(records: MutationRecord[]) {
    for (const record of records) {
      if (
        record.type === 'attributes' &&
        record.target instanceof HTMLElement
      ) {
        this.fireOnMonetizationChangeIfHaveAttribute({
          node: record.target,
          force: true
        })
      }
    }
  }

  private fireOnMonetizationChangeIfHaveAttribute({
    node,
    force = false
  }: FireOnMonetizationChangeIfHaveAttributeParams) {
    const attribute = node.getAttribute('onmonetization')
    if (attribute || force) {
      const customEvent = new CustomEvent('onmonetization-attr-changed', {
        bubbles: true,
        detail: {
          attribute
        }
      })
      const result = node.dispatchEvent(customEvent)
      debug('dispatched onmonetization-attr-changed ev', result)
    }
    return Boolean(attribute)
  }

  stop() {
    this.headObserver?.disconnect()
    this.onMonetizationAttrObserver?.disconnect()
    for (const val of this.monetizationTags.values()) {
      val.observer.disconnect()
    }
    this.monetizationTags.clear()
  }

  atMostOneTagAndNoneInBody() {
    let fromBody = false
    for (const value of this.monetizationTags.values()) {
      if (value.details.fromBody) {
        fromBody = true
      }
    }
    return this.monetizationTags.size <= 1 && !fromBody
  }
}
