import { v4 as uuidV4 } from 'uuid'

import { whenDocumentReady } from './whenDocumentReady'
import { CustomError } from './CustomError'

const debug =
  // console.log.bind(console, 'MonetizationTagManager')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  (..._: unknown[]) => {}

export interface PaymentDetails {
  /**
   * This doesn't map 1 to 1 with a monetization tag, rather with a
   * configuration of a tag. e.g. a new href on a link will mean a new
   * requestId
   */
  requestId: string
  paymentPointer: string
  initiatingUrl: string
  fromBody: boolean
  tagType: TagType
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
export type MonetizationTagList = NodeListOf<MonetizationTag>

export type TagType = 'meta' | 'link'

export function getTagType(tag: MonetizationTag): TagType {
  return tag instanceof HTMLMetaElement ? 'meta' : 'link'
}

export class DeprecatedMetaTagIgnoredError extends CustomError {}

interface FireOnMonetizationChangeIfHaveAttributeParams {
  node: HTMLElement
  wasChange?: boolean
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

const MAX_NUMBER_META_TAGS = 1

function monetizationTagTypeSpecified(
  tag: Node,
  ambiguous = false
): tag is MonetizationTag {
  if (tag instanceof HTMLLinkElement) {
    return tag.rel === 'monetization' || (ambiguous && !tag.rel)
  } else if (tag instanceof HTMLMetaElement) {
    return tag.name === 'monetization' || (ambiguous && !tag.name)
  } else {
    return false
  }
}

function nodeIsPotentiallyMonetizationTag(node: Node): node is MonetizationTag {
  return node instanceof HTMLLinkElement || node instanceof HTMLMetaElement
}

function getTagAttrs(tag: MonetizationTag, tagType: TagType) {
  return Object.fromEntries(
    MonetizationTagAttrs[tagType].map(attr => {
      return [attr, tag.getAttribute(attr)]
    })
  )
}

export class MonetizationTagManager {
  private affinity: TagType = 'meta'
  private documentObserver!: MutationObserver
  private monetizationTagAttrObserver!: MutationObserver

  private monetizationTags = new Map<
    MonetizationTag,
    {
      details: PaymentDetails
      // TODO: should this just go straight on the payment details?
      attrs: Record<string, string | null>
    }
  >()

  private linkTagsById = new Map<string, WeakRef<HTMLLinkElement>>()

  dispatchEventByLinkId(id: string, event: Event) {
    const ref = this.linkTagsById.get(id)
    const link = ref?.deref()
    if (link) {
      debug('dispatchLinkEventByLinkId', id, event)
      link.dispatchEvent(event)
    }
  }

  requestIds(): string[] {
    return Array.from(this.monetizationTags.values()).map(
      e => e.details.requestId
    )
  }

  linkRequests(): PaymentDetails[] {
    return Array.from(this.monetizationTags.values())
      .map(e => e.details)
      .filter(d => d.tagType === 'link')
  }

  constructor(
    private window: Window,
    private document: Document,
    private callback: PaymentDetailsChangeCallback
  ) {
    this.documentObserver = new MutationObserver(records =>
      this._onWholeDocumentObserved(records)
    )
    this.monetizationTagAttrObserver = new MutationObserver(records =>
      this._onMonetizationTagAttrsChange(records)
    )
  }

  /**
   * The head will be null early on when invoked in an extension content script,
   * so we may need to wait
   */
  startWhenDocumentReady(): void {
    whenDocumentReady(this.document, this._start.bind(this))
  }

  // Though this is `public`, it's not part of the public interface, so we
  // prefix this method with `_`
  _start() {
    const monetizationTags: MonetizationTagList =
      this.document.querySelectorAll('meta,link')
    monetizationTags.forEach(tag => {
      try {
        this._observeMonetizationTagAttrs(tag)
        if (!monetizationTagTypeSpecified(tag)) {
          return
        }
        this.onAddedTag(tag)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    })
    const onMonetizations =
      this.document.querySelectorAll<HTMLElement>('[onmonetization]')
    onMonetizations.forEach(om => {
      this.checkMonetizationAttr(om)
    })
    this.documentObserver.observe(this.document, {
      subtree: true,
      childList: true,
      attributeFilter: ['onmonetization']
    })
  }

  _check(op: string, node: Node) {
    debug('head node', op, node)
    if (nodeIsPotentiallyMonetizationTag(node)) {
      if (op === 'added') {
        this._observeMonetizationTagAttrs(node)
        if (monetizationTagTypeSpecified(node)) {
          this.onAddedTag(node)
        }
      } else if (op === 'removed' && this.monetizationTags.has(node)) {
        this._onRemovedTag(node)
      }
    }
    if (op === 'added' && node instanceof HTMLElement) {
      this.checkMonetizationAttr(node)
    }
  }

  _checkRemoved = this._check.bind(this, 'removed')
  _checkAdded = this._check.bind(this, 'added')

  _onWholeDocumentObserved(records: MutationRecord[]) {
    debug('head mutation records.length=', records.length)

    // Explicitly remove these first
    for (const record of records) {
      debug('Record', record.type, record.target)
      if (record.type === 'childList') {
        record.removedNodes.forEach(this._checkRemoved)
      }
    }

    for (const record of records) {
      debug('Record', record.type, record.target)
      if (record.type === 'childList') {
        record.addedNodes.forEach(this._checkAdded)
      }
    }
    this.onOnMonetizationChangeObserved(records)
  }

  _onMonetizationTagAttrsChange(records: MutationRecord[]) {
    const handledTags = new Set<Node>()
    // Check for a non specified link or meta with the type now specified and
    // just treat it as a newly seen, monetization tag
    for (const record of records) {
      const target = record.target as MonetizationTag
      if (handledTags.has(target)) {
        continue
      }
      const hasTarget = this.monetizationTags.has(target)
      const typeSpecified = monetizationTagTypeSpecified(target)
      // this will also handle the case of a @disabled tag that
      // is not tracked, becoming enabled
      if (!hasTarget && typeSpecified) {
        this.onAddedTag(target)
        handledTags.add(target)
      }
      if (hasTarget && !typeSpecified) {
        this._onRemovedTag(target)
        handledTags.add(target)
      }
    }

    for (const record of records) {
      const target = record.target
      if (handledTags.has(target)) {
        continue
      }

      if (
        record.type === 'attributes' &&
        record.attributeName === 'disabled' &&
        target instanceof HTMLLinkElement &&
        // can't use record.target[disabled] as it's a Boolean not string
        target.getAttribute('disabled') !== record.oldValue
      ) {
        const wasDisabled = record.oldValue !== null
        const isDisabled = target.hasAttribute('disabled')
        if (wasDisabled != isDisabled) {
          this._onChangedPaymentEndpoint(target, isDisabled, wasDisabled)
          handledTags.add(target)
        }
      } else if (
        record.type === 'attributes' &&
        record.attributeName === 'content' &&
        target instanceof HTMLMetaElement &&
        target['content'] !== record.oldValue
      ) {
        this._onChangedPaymentEndpoint(target)
        handledTags.add(target)
      } else if (
        record.type === 'attributes' &&
        record.attributeName === 'href' &&
        target instanceof HTMLLinkElement &&
        target['href'] !== record.oldValue
      ) {
        this._onChangedPaymentEndpoint(target)
        handledTags.add(target)
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
   * Invokes this.callback unless tag is disabled
   */
  private onAddedTag(tag: MonetizationTag) {
    const type = getTagType(tag)
    if (!monetizationTagTypeSpecified(tag)) {
      return
    }
    // TODO:WM2 any other cases?
    if (type === 'link' && tag.hasAttribute('disabled')) {
      return
    }

    if (type != this.affinity) {
      if (type === 'link') {
        this.affinity = 'link'
        for (const tag of this.monetizationTags.keys()) {
          this._onRemovedTag(tag)
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
      this.monetizationTags.size + 1 > MAX_NUMBER_META_TAGS
    ) {
      throw new Error(
        `Web-Monetization Error: Ignoring tag with ` +
          `paymentPointer=${details.paymentPointer}, only ${MAX_NUMBER_META_TAGS} ` +
          `monetization tag[s] supported at a time. `
      )
    }

    if (details.tagType === 'link') {
      this.linkTagsById.set(
        details.requestId,
        new WeakRef(tag as HTMLLinkElement)
      )
    }

    const attrs = getTagAttrs(tag, details.tagType)
    this.monetizationTags.set(tag, { details, attrs })
    this.callback({ stopped: null, started: details })
  }

  _observeMonetizationTagAttrs(tag: MonetizationTag) {
    const attributeFilter = MonetizationTagAttrs[getTagType(tag)]
    this.monetizationTagAttrObserver.observe(tag, {
      childList: false,
      attributes: true,
      attributeOldValue: true,
      attributeFilter
    })
  }

  _onRemovedTag(tag: MonetizationTag) {
    const entry = this.getEntry(tag)
    this.monetizationTags.delete(tag)
    this.clearLinkById(entry.details)
    this.callback({ started: null, stopped: entry.details })
  }

  private getEntry(meta: MonetizationTag) {
    const entry = this.monetizationTags.get(meta)
    if (!entry) {
      throw new Error('tag not tracked: ' + meta.outerHTML)
    }
    return entry
  }

  _onChangedPaymentEndpoint(
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
      entry.attrs = getTagAttrs(tag, entry.details.tagType)
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
      requestId: uuidV4(),
      paymentPointer: paymentPointer.trim(),
      initiatingUrl: this.window.location.href,
      tagType: getTagType(meta),
      fromBody: meta.parentElement != this.document.head
    }
  }

  private checkMonetizationAttr(node: HTMLElement) {
    debug('checkMonetizationAttr', node)
    this.fireOnMonetizationChangeIfHaveAttribute({ node })
  }

  private onOnMonetizationChangeObserved(records: MutationRecord[]) {
    for (const record of records) {
      if (
        record.type === 'attributes' &&
        record.target instanceof HTMLElement &&
        record.attributeName === 'onmonetization'
      ) {
        this.fireOnMonetizationChangeIfHaveAttribute({
          node: record.target,
          wasChange: true
        })
      }
    }
  }

  private fireOnMonetizationChangeIfHaveAttribute({
    node,
    wasChange = false
  }: FireOnMonetizationChangeIfHaveAttributeParams) {
    const attribute = node.getAttribute('onmonetization')
    if (attribute || wasChange) {
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
    this.documentObserver?.disconnect()
    this.monetizationTagAttrObserver?.disconnect()
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
