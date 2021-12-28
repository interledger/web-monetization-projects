import { MonetizationTagManager } from './MonetizationTagManager'

const timeout = async (ms = 0) =>
  new Promise(resolve => setTimeout(resolve, ms))

describe('MonetizationTagManager', () => {
  it('should emit a started event when a tag is added', async () => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'monetization')
    link.setAttribute('href', '$ilp.uphold.com/gRa4mXFEMYrL')
    let started = null
    const manager = new MonetizationTagManager(window, document, args => {
      started = args.started
    })

    jest.spyOn(manager, 'start')
    manager.startWhenDocumentReady()
    expect(manager['start']).toBeCalled()

    document.head.appendChild(link)
    expect(document.readyState).toBe('complete')

    expect(started).toBeNull()
    // We need this because the MutationObserver callbacks are async
    await timeout()

    expect(started).toEqual({
      requestId: expect.stringMatching(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      ),
      paymentPointer: 'http://localhost/$ilp.uphold.com/gRa4mXFEMYrL',
      initiatingUrl: 'http://localhost/',
      tagType: 'link',
      fromBody: false
    })
  })
})
