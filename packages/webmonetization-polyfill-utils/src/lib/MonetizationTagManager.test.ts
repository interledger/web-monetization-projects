import {
  metaDeprecatedMessage,
  MonetizationTagManager,
  PaymentDetailsChangeArguments,
  PaymentDetailsChangeCallback
} from './MonetizationTagManager'

const timeout = async (ms = 0) =>
  new Promise(resolve => setTimeout(resolve, ms))

const expectUuid4 = expect.stringMatching(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
)

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
  it('should emit an event with `started` when a tag is added', async () => {
    const link = makeLink('$ilp.uphold.com/gRa4mXFEMYrL')
    const [changes, callback] = makeChangesCallback()

    const manager = makeManager(callback)

    jest.spyOn(manager, 'start')
    manager.startWhenDocumentReady()
    expect(manager['start']).toBeCalled()

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
    'should emit an event with `started` immediately upon starting ' +
      'when a tag is already in the document',
    () => {
      const link = makeLink('$ilp.uphold.com/already')
      const [changes, callback] = makeChangesCallback()
      const manager = makeManager(callback)
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
    const manager = makeManager(callback)
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
    const manager = makeManager(callback)
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
})
