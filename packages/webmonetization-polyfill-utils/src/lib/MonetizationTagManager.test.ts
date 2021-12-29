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

const makeLink = (pp: string) => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'monetization')
  link.setAttribute('href', pp.replace(/^\$/, 'https://'))
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
      window.addEventListener('error', resolve)
    }),
    new Promise<never>((_, reject) => setTimeout(reject, timeout))
  ])
}

const makeManager = (cb: PaymentDetailsChangeCallback) => {
  return new MonetizationTagManager(window, document, cb)
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
    document
      .querySelectorAll('meta[name="monetization"],link[rel="monetization"]')
      .forEach(element => element.remove())
  })
  it('should invoke callback with `started` when a tag is added', async () => {
    const link = makeLink('$ilp.uphold.com/gRa4mXFEMYrL')
    const [changes, callback] = makeChangesCallback()

    manager = makeManager(callback)

    jest.spyOn(manager, 'start')
    manager.startWhenDocumentReady()
    expect(manager['start']).toHaveBeenCalled()

    document.head.appendChild(link)
    expect(document.readyState).toBe('complete')

    expect(changes.started).toBeNull()
    // We need this because the MutationObserver callbacks are async
    await timeout()

    expect(changes.started).toEqual({
      requestId: expectUuid4,
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
      const link = makeLink('$ilp.uphold.com/already')
      const [changes, callback] = makeChangesCallback()
      manager = makeManager(callback)
      document.head.appendChild(link)
      expect(changes.started).toBeNull()
      manager.startWhenDocumentReady()
      // don't need to wait for MutationObserver
      expect(changes.started).toEqual({
        requestId: expectUuid4,
        paymentPointer: 'https://ilp.uphold.com/already',
        initiatingUrl: 'http://localhost/',
        tagType: 'link',
        fromBody: false
      })
    }
  )
  it('should set fromBody: true when tag is from body', async () => {
    const link = makeLink('$ilp.uphold.com/inBody')
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)

    expect(changes.started).toEqual({
      requestId: expectUuid4,
      paymentPointer: 'https://ilp.uphold.com/inBody',
      initiatingUrl: 'http://localhost/',
      tagType: 'link',
      fromBody: true
    })
  })

  it('should throw an error when a meta is added after a link', async () => {
    const link = makeLink('$ilp.uphold.com/linkBeforeMeta')
    const [changes, callback] = makeChangesCallback()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.body.appendChild(link)
    await timeout(0)

    expect(changes.started).toEqual({
      requestId: expectUuid4,
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
    // why is this a string ?
    expect(typeof callArg).toBe('string')
    const firstLine = callArg.split('\n')
    expect(firstLine[0]).toBe(`Error: Uncaught [Error: ${message}]`)
  })

  it('should stop an initial meta and use the secondary link', async () => {
    // TODO: we could optimize away the pointless start by checking on start
    // for existing tags in the dom, and filtering metas if links were found.

    const meta = makeMeta('$tag.com/meta')
    const link = makeLink('$tag.com/link')
    document.head.appendChild(meta)
    const callback = jest.fn()
    manager = makeManager(callback)
    manager.startWhenDocumentReady()
    document.head.appendChild(link)
    await timeout(0)
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenNthCalledWith(1, {
      started: {
        fromBody: false,
        initiatingUrl: 'http://localhost/',
        paymentPointer: meta.content,
        requestId: expectUuid4,
        tagType: 'meta'
      },
      stopped: null
    })
    expect(callback).toHaveBeenNthCalledWith(2, {
      started: null,
      stopped: {
        fromBody: false,
        initiatingUrl: 'http://localhost/',
        paymentPointer: meta.content,
        requestId: expectUuid4,
        tagType: 'meta'
      }
    })
    expect(callback).toHaveBeenNthCalledWith(3, {
      started: {
        fromBody: false,
        initiatingUrl: 'http://localhost/',
        paymentPointer: link.href,
        requestId: expectUuid4,
        tagType: 'link'
      },
      stopped: null
    })
  })
})
