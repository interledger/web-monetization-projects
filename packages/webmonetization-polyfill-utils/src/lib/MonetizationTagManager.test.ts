import { afterEach, describe, expect, it, jest } from '@jest/globals'

// import { jest } from '@jest/globals'
import { resolvePaymentEndpoint } from '..'

import {
  metaDeprecatedMessage,
  MonetizationTagManager,
  PaymentDetailsChangeArguments,
  PaymentDetailsChangeCallback
} from './MonetizationTagManager'

const timeout = async (ms = 0) =>
  new Promise(resolve => setTimeout(resolve, ms))

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const expectUuid4 = expect.stringMatching(uuidRegex)

const makeLink = (pp: string, opts?: { dontResolve?: boolean }) => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'monetization')
  link.setAttribute('href', opts?.dontResolve ? pp : resolvePaymentEndpoint(pp))
  return link
}

const makeMeta = (pp: string) => {
  const link = document.createElement('meta')
  link.setAttribute('name', 'monetization')
  link.setAttribute('content', pp)
  return link
}

const captureOneWindowError = async (timeout = 10e3): Promise<ErrorEvent> => {
  return Promise.race([
    new Promise<ErrorEvent>(resolve => {
      window.addEventListener('error', resolve, { once: true })
    }),
    new Promise<never>((_, reject) => setTimeout(reject, timeout))
  ])
}

const makeManager = (cb: PaymentDetailsChangeCallback) => {
  return new MonetizationTagManager(window, document, cb)
}

const makeLinkAttrs = (pp: string) => {
  return {
    crossorigin: null,
    disabled: null,
    href: resolvePaymentEndpoint(pp),
    rel: 'monetization',
    type: null
  }
}

const makeMetaAttrs = (pp: string) => {
  return {
    content: pp,
    name: 'monetization'
  }
}

const makeChangesCallback = (): [
  PaymentDetailsChangeArguments,
  PaymentDetailsChangeCallback
] => {
  const reference = {
    started: null,
    stopped: null
  }
  return [reference, Object.assign.bind(Object, reference)]
}

describe('MonetizationTagManager', () => {
  let manager: MonetizationTagManager
  afterEach(() => {
    manager?.stop()
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })
  it('should invoke callback with `started` when a tag is added', async () => {
    const pp = '$ilp.uphold.com/gRa4mXFEMYrL'
    const link = makeLink(pp)
    const [changes, callback] = makeChangesCallback()

    manager = makeManager(callback)

    jest.spyOn(manager, '_start')
    manager.startWhenDocumentReady()
    expect(manager['_start']).toHaveBeenCalled()

    document.head.appendChild(link)
    expect(document.readyState).toBe('complete')

    expect(changes.started).toBeNull()
    // We need this because the MutationObserver callbacks are async
    await timeout()

    expect(changes.started).toEqual({
      requestId: expectUuid4,
      attrs: makeLinkAttrs(pp),
      paymentPointer: 'https://ilp.uphold.com/gRa4mXFEMYrL',
      initiatingUrl: 'http://localhost/',
      tagType: 'link',
      fromBody: false
    })
  })
  it(
    'should invoke callback with `started` immediately upon starting, ' +
      'when a tag is already in the document',
    () => {
      const pp = '$ilp.uphold.com/already'
      const link = makeLink(pp)
      const [changes, callback] = makeChangesCallback()
      manager = makeManager(callback)
      document.head.appendChild(link)
      expect(changes.started).toBeNull()
      manager.startWhenDocumentReady()
      // don't need to wait for MutationObserver
      expect(changes.started).toEqual({
        attrs: makeLinkAttrs(pp),
        requestId: expectUuid4,
        paymentPointer: 'https://ilp.uphold.com/already',
        initiatingUrl: 'http://localhost/',
        tagType: 'link',
        fromBody: false
      })
    }
  )
  it('should set fromBody: true when tag is from body', async () => {
    const pp = '$ilp.uphold.com/inBody'
    const link = makeLink(pp)
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)

    expect(changes.started).toEqual({
      attrs: makeLinkAttrs(pp),
      requestId: expectUuid4,
      paymentPointer: 'https://ilp.uphold.com/inBody',
      initiatingUrl: 'http://localhost/',
      tagType: 'link',
      fromBody: true
    })
  })

  it('should fire onmonetization-attr-changed bubbling on elements with the right attrs', () => {
    const [_, callback] = makeChangesCallback()
    manager = makeManager(callback)
    document.body.innerHTML = `
    <div><p id='ptag' onmonetization="console.log('OK')"></p></div>
    `
    const ptag = document.getElementById('ptag')
    let firing = 1
    ptag?.addEventListener('onmonetization-attr-changed', event => {
      // This is never fired via listening with option capture:true and by
      // calling event.stopPropagation
      expect(firing++).toBe(2)
    })

    // The polyfill in the content script will bind to this event and then
    // invoke `event.target.onmonetization = new Function(event.detail.attribute)`
    // in the main page JavaScript context.
    document.addEventListener(
      'onmonetization-attr-changed',
      event => {
        expect(firing++).toBe(1)
        expect(event.bubbles).toBe(true)
        expect((event as CustomEvent).detail.attribute).toBe(
          "console.log('OK')"
        )
        expect(event.target).toBe(ptag)
        expect(event.currentTarget).toBe(document)
        event.stopPropagation()
      },
      { capture: true, once: true }
    )
    manager.startWhenDocumentReady()
    expect.assertions(5)
  })

  it('should throw an error when a meta is added after a link', async () => {
    const pp = '$ilp.uphold.com/linkBeforeMeta'
    const link = makeLink(pp)
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)

    expect(changes.started).toEqual({
      requestId: expectUuid4,
      attrs: makeLinkAttrs(pp),
      paymentPointer: 'https://ilp.uphold.com/linkBeforeMeta',
      initiatingUrl: 'http://localhost/',
      tagType: 'link',
      fromBody: true
    })
    const meta = makeMeta('$ilp.uphold.com/meta')
    document.head.appendChild(meta)

    // At least in JSDOM this isn't called directly by our code, but rather
    // it's called by some uncaught exception error code
    const spy = jest.spyOn(console, 'error')
    const error = await captureOneWindowError()
    const message = metaDeprecatedMessage
    expect(error.error.message).toEqual(message)
    const callArg = spy.mock.calls[0][0]
    const firstLine = callArg.message.split('\n')
    expect(firstLine[0]).toBe(`Uncaught [Error: ${message}]`)
  })

  it('should throw an error when trying to use more than one meta', async () => {
    const ppa = makeMeta('$a.pp.com')
    const ppb = makeMeta('$b.pp.com')
    const cb = jest.fn()
    manager = makeManager(cb)
    manager.startWhenDocumentReady()
    document.head.appendChild(ppa)
    document.head.appendChild(ppb)
    const errorEvent = await captureOneWindowError()
    expect(errorEvent.message).toMatchInlineSnapshot(
      `"Web-Monetization Error: Ignoring tag with paymentPointer=$b.pp.com, only 1 monetization tag[s] supported at a time. "`
    )
  })

  it('should throw an error when trying to use meta in the body', async () => {
    const ppa = makeMeta('$body.pp.com')
    const cb = jest.fn()
    manager = makeManager(cb)
    manager.startWhenDocumentReady()
    document.body.appendChild(ppa)
    const errorEvent = await captureOneWindowError()
    expect(errorEvent.message).toMatchInlineSnapshot(
      `"Web-Monetization Error: <meta name="monetization"> must be in the document head"`
    )
  })

  it('should stop an initial meta and use the secondary link', async () => {
    // TODO: we could optimize away the pointless start by checking on start
    // for existing tags in the dom, and filtering metas if links were found.

    const metaPp = '$tag.com/meta'
    const meta = makeMeta(metaPp)
    const linkPp = '$tag.com/link'
    const link = makeLink(linkPp)
    document.head.appendChild(meta)
    const callback = jest.fn()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.head.appendChild(link)
    await timeout(0)
    expect(callback).toHaveBeenCalledTimes(3)
    const started = {
      attrs: makeMetaAttrs(metaPp),
      fromBody: false,
      initiatingUrl: 'http://localhost/',
      paymentPointer: meta.content,
      requestId: expectUuid4,
      tagType: 'meta'
    }
    expect(callback).toHaveBeenNthCalledWith(1, {
      started,
      stopped: null
    })
    expect(callback).toHaveBeenNthCalledWith(2, {
      started: null,
      stopped: started
    })
    expect(callback).toHaveBeenNthCalledWith(3, {
      started: {
        attrs: makeLinkAttrs(linkPp),
        fromBody: false,
        initiatingUrl: 'http://localhost/',
        paymentPointer: link.href,
        requestId: expectUuid4,
        tagType: 'link'
      },
      stopped: null
    })
  })

  it('should not invoke callback when link starts disabled', async () => {
    const link = makeLink('$ilp.uphold.com/gRa4mXFEMYrL')
    const [changes, callback] = makeChangesCallback()
    link.setAttribute('disabled', '')
    expect(link).toMatchInlineSnapshot(`
      <link
        disabled=""
        href="https://ilp.uphold.com/gRa4mXFEMYrL"
        rel="monetization"
      />
    `)
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)
    expect(changes.started).toBeNull()
    expect(changes.stopped).toBeNull()
  })

  it(
    'should provide a way of knowing when to ' +
      'support document.monetization for link tags that used ' +
      'document.monetization',
    async () => {
      const link = makeLink('$tag.com/link')
      const [changes, callback] = makeChangesCallback()
      manager = makeManager(callback)
      manager.startWhenDocumentReady()
      document.body.appendChild(link)
      // wait for MutationObserver
      await timeout()
      expect(manager.atMostOneTagAndNoneInBody()).toBe(false)
      link.remove()
      document.head.appendChild(link)
      // wait for MutationObserver
      await timeout()
      expect(manager.atMostOneTagAndNoneInBody()).toBe(true)
    }
  )

  it('should invoked stopped when link becomes disabled', async () => {
    const pp = 'https://ilp.uphold.com/toBeDisabled'
    const link = makeLink(pp)
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)
    expect(changes.started?.paymentPointer).toBe(pp)
    const started = { ...changes.started }
    expect(changes.stopped).toBeNull()
    const endpoint = jest.spyOn(manager, '_onChangedPaymentEndpoint')
    link.setAttribute('disabled', 'true')
    await timeout(0)
    expect(link).toMatchInlineSnapshot(`
      <link
        disabled="true"
        href="https://ilp.uphold.com/toBeDisabled"
        rel="monetization"
      />
    `)
    expect(endpoint.mock.calls).toMatchInlineSnapshot(`
      [
        [
          <link
            disabled="true"
            href="https://ilp.uphold.com/toBeDisabled"
            rel="monetization"
          />,
          true,
          false,
        ],
      ]
    `)
    expect(endpoint).toHaveBeenCalled()
    expect(changes.started).toBeNull()
    expect(changes.stopped).toEqual(started)
  })

  it('should invoke callback with started when disabled link becomes enabled', async () => {
    const pp = 'https://ilp.uphold.com/startsDisabled'
    const link = makeLink(pp)
    link.setAttribute('disabled', 'true')

    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    document.body.appendChild(link)
    manager.startWhenDocumentReady()
    await timeout(0)

    // Is this just a JSDOM thing ?
    expect(link.disabled).toBeUndefined()
    // Disabled attr is definitely set
    expect(link.getAttributeNames()).toMatchInlineSnapshot(`
      [
        "rel",
        "href",
        "disabled",
      ]
    `)
    // Disabled attr is definitely set
    expect(link).toMatchInlineSnapshot(`
      <link
        disabled="true"
        href="https://ilp.uphold.com/startsDisabled"
        rel="monetization"
      />
    `)

    expect(changes.started).toBeNull()
    expect(changes.stopped).toBeNull()

    link.removeAttribute('disabled')
    await timeout(0)
    expect(changes.started?.paymentPointer).toBe(pp)
    expect(changes.stopped).toBeNull()
  })

  it('should observe empty metas, then invoke start when name=monetization set', async () => {
    const pp = '$ilp.uphold.com/noName'
    const meta = makeMeta(pp)
    meta.removeAttribute('name')
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)

    const observeSpy = jest.spyOn(manager, '_observeMonetizationTagAttrs')
    const attChangesSpy = jest.spyOn(manager, '_onMonetizationTagAttrsChange')

    manager.startWhenDocumentReady()
    document.head.appendChild(meta)
    await timeout()

    expect(observeSpy).toHaveBeenCalledWith(meta)

    await timeout(0)
    expect(changes.started).toBeNull()
    expect(changes.stopped).toBeNull()
    expect(attChangesSpy).not.toHaveBeenCalled()
    expect(meta.name).toBe('')
    meta.setAttribute('name', 'monetization')
    await timeout()
    expect(meta.name).toBe('monetization')
    expect(attChangesSpy).toHaveBeenCalled()

    expect(changes.started?.paymentPointer).toBe(pp)
    meta.name = ''
    await timeout(0)
    expect(changes.stopped?.paymentPointer).toBe(pp)
  })

  it('should observe empty metas with incorrect @name then invoke start when name=monetization set', async () => {
    const pp = '$ilp.uphold.com/noName'
    const meta = makeMeta(pp)
    meta.name = 'bitcoin'

    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    document.head.appendChild(meta)
    manager.startWhenDocumentReady()

    expect(changes.started).toBeNull()
    expect(changes.stopped).toBeNull()

    meta.setAttribute('name', 'monetization')
    await timeout()
    expect(meta.name).toBe('monetization')
    expect(changes.started?.paymentPointer).toBe(pp)
  })

  it('should pick up changes to link href', async () => {
    const pp = 'https://ilp.uphold.com/noName'
    const link1 = makeLink(pp)
    const callback = jest.fn()
    manager = makeManager(callback)
    document.head.appendChild(link1)
    manager.startWhenDocumentReady()
    expect(callback).toHaveBeenCalledTimes(1)
    link1.href = `${pp}Suffixed`
    await timeout()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should be able to handle multiple link mutations', async () => {
    const pp = 'https://ilp.uphold.com/noName'
    const link1 = makeLink(pp)
    const link2 = makeLink(pp)
    const callback = jest.fn()
    manager = makeManager(callback)
    document.head.appendChild(link1)
    document.head.appendChild(link2)
    // set this before start
    const spied = jest.spyOn(manager, '_onMonetizationTagAttrsChange')
    const removed = jest.spyOn(manager, '_onRemovedTag')

    manager.startWhenDocumentReady()
    expect(callback).toHaveBeenCalledTimes(2)
    link1.rel = 'bitcoin'
    link2.rel = 'bitcoin'
    await timeout()
    // This will be called with multiple records
    expect(spied).toHaveBeenCalledTimes(1)
    const mutations = spied.mock.calls[0][0]
    expect(mutations[0].target).toBe(link1)
    expect(mutations[1].target).toBe(link2)
    expect(removed).toHaveBeenCalledTimes(2)
  })

  it('should not keep a tag that starts disabled in monetizationTags', async () => {
    const pp = 'https://ilp.uphold.com/noName'
    const link = makeLink(pp)
    link.setAttribute('disabled', 'true')
    const callback = jest.fn()
    manager = makeManager(callback)
    document.head.appendChild(link)
    manager.startWhenDocumentReady()
    const tags = manager['monetizationTags']
    expect(tags.size).toBe(0)
    expect(callback).toHaveBeenCalledTimes(0)
    link.removeAttribute('disabled')
    await timeout()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should only invoke started callback once for multiple attr changes', async () => {
    expect.assertions(2)

    const pp = 'https://ilp.uphold.com/noName'
    const link1 = makeLink(pp)
    const callback = jest.fn()
    manager = makeManager(callback)
    document.head.appendChild(link1)
    manager.startWhenDocumentReady()
    expect(callback).toHaveBeenCalledTimes(1)
    // Change disabled and href at the same time
    link1.setAttribute('crossorigin', 'anonymous')
    link1.setAttribute('disabled', '')
    link1.setAttribute('href', 'https://ilp.uphold.com/noBody')
    await timeout()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should only need one observer, for added/removed nodes and onmonetization', async () => {
    const callback = jest.fn()
    manager = makeManager(callback)
    const spy = jest.spyOn(manager, '_onWholeDocumentObserved')
    document.body.innerHTML = `<p id='ptag' onmonetization="console.log('hello')"></p>`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ptag = document.getElementById('ptag')!
    manager.startWhenDocumentReady()
    ptag.setAttribute('onmonetization', "console.log('hello world!')")
    await timeout()
    expect(spy.mock.calls[0][0][0].type).toBe('attributes')
  })

  it('should emit error events on the links when payment pointer is not well formed', async () => {
    expect.assertions(1)
    const manager = makeManager(jest.fn())
    manager.startWhenDocumentReady()
    const link = makeLink('ftp://invalid.com', { dontResolve: true })
    await Promise.race([
      new Promise<void>(resolve => {
        link.addEventListener('error', event => {
          expect(Object.getPrototypeOf(event).constructor).toBe(Event)
          // expect(event.error).toBeInstanceOf(PaymentEndpointError)
          // expect(event.error.message).toMatchInlineSnapshot(
          //   `"SPSP endpoint must be specified as fully resolved https:// url, got \\"ftp://invalid.com/\\" "`
          // )
          resolve()
        })
      }),
      timeout()
    ])
    document.head.appendChild(link)
  })
})
