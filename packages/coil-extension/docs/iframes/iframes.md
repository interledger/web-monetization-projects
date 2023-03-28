# Iframes

### Problem Statement:

We need to determine if monetization is allowed in the initiatorContent (the content script running inside the `<iframe>` that initiates the monetization check).

To do this, we must identify the `<iframe>` element in the parentFrameContent
(content script running in the parent frame) that corresponds to the initiatorContent.
Then, we must verify if the monetization is allowed based on the `<iframe>` element's attributes,
such as its allow attribute, which should include 'monetization' in its feature set policy for
monetization to be allowed.

Additionally, for nested iframes, all the parent iframes in the chain of ancestors must have the 'monetization'
feature set in their allow attributes for monetization to be allowed in the nested iframe.

Note that iframes may be from various origins, not necessarily the top frame in a tab.

### Terms:

- **parentFrameContent**: Content script running in the parent frame.
- **initiatorContent**: Content script running inside the `<iframe>` that initiates the monetization check.
- **backgroundScript**: The background script of the extension.

### Available Tools and Methods:

- **webNavigation API**: It can be used in the backgroundScript to obtain details about frames, including their parent frames and frame IDs. Useful methods include webNavigation.getAllFrames() to get a list of frames in a tab, and webNavigation.getFrame() to get details about a specific frame in a tab.
- **window.parent**: This property in the initiatorContent can be used to reference the parent window (the window containing the iframe).
- **window.postMessage()**: This method can be used to send messages between windows (or iframes) in a secure way. It can be used to communicate between the initiatorContent and the parentFrameContent.
- **event.source**: When handling a message event, this property can be used to get the Window object of the message sender. It can be used in the parentFrameContent to compare the source of the message with the contentWindow property of each iframe.
- **chrome.runtime.sendMessage()**: This method allows content scripts to send messages to the background script.
- **chrome.runtime.onMessage**: This event can be used to listen for messages sent by content scripts in the background script.
- **chrome.tabs.sendMessage()**: This method can be used to send messages from the background script to a specific content script running in a frame identified by a tabId and frameId.
- **contentWindow**: This property of an `<iframe>` element provides access to the Window object of the document inside the iframe and can be used to send messages between the parent and child documents using the postMessage() method.

### Security Concerns:

The use of postMessage() to send messages between frames must be done with caution to prevent potential security vulnerabilities such as cross-site scripting attacks.
CorrelationIds (uuid.v4) should be used in the message payloads to prevent eavesdropping and replay attacks.
Nothing else, including (but not limited to) frameId, tabId, parentFrameId.

It's possible to do matching of event.source against iframe.contentWindow to do correlation.

### Solution overview

(This section is ripped from the PR and could do with some rewriting)

To do so, it takes advantage of:

1. [webNavigation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation) wext apis
   - New BackgroundFrameService
     - Keeps track of frames, including the current readyState/url/parentFrameId etc.
     - use `frameChanged` event where using chrome.tabs.onUpdated before (which was [problematic](https://github.com/coilhq/web-monetization-projects/issues/203))
   - Will require extra permissions which may be off-putting to some users
     - This will not actually give us any more private information than we already have. This may not be clear to all users though.
2. [MessageSender](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome/index.d.ts#L5500-L5505)['frameId'], MessageSender['tab'] attributes
   Messages sent using `chrome.runtime.sendMessage` api from content scripts
   will be recieved in the background script onMessage listener with
   tabId/frameId implied (i.e. not inside the message payload).

Whenever a monetization request occurs inside an iframe a request will be sent to the background page to check if that iframe is allowed.

The request handler in the background page consults the BackgroundFramesService to determine the parent frame of the sender then sends a message to the associated content script via `tabs.sendMessage(tabId, msg, {frameId: parentId})`. The `msg` contains the `{tabId, frameId}` monetization is requested from.

- Inside the parent frame content script, a WeakMap of iframe elements to `Promise<{tabId, frameId}>` is maintained as well as a promise queue via a Map of correlationId to promise resolver.
- A linear search is done over a query of all iframes, consulting the WeakMap, queuing new promises where necessary, `await`ing each promise in turn. The promise result frame is checked against the search element frame.
  - All `<iframe>`s in the page that have no promise queued already are sent a correlationId via `frame.contentWindow!.postMessage`
  - Concurrent searches initiated via multiple child frames requesting monetization are handled fine using this method
- Content scripts listen for the correlationId via adding listeners to the window `message` event
  - This is then reported to the background page, which looks up the parent frame of the sender and reports the correlationId/frame pair and the correlationId associated promise is resolved with the frame.
  - It seems highly unlikely that nefarious actors could listen in on the event, replaying the message to another window and beat the content script listener to use the correlationId.
    - We could take extra measures from the background page to ensure ids are only ever used once but it does not really seem necessary.
      - unknown correlationIds are ignored

### Questions:

- Should we limit the amount of concurrently monetized frames ?
  - If so, how ?
- Do we need to do anything special client side to adjust bandwidth? Or will the server do it all ?

  - Is there anything needed server side to optimally support this ?
    - Seems to be some (transient) errors when a bunch of streams connect at the same time ![image](https://user-images.githubusercontent.com/525211/75645769-ce4a5e80-5c79-11ea-9083-7748dad478eb.png)
    - it seems the retry logic handles them though

- What does the text in the popup mean now that 'content' could refer to inner frames as well as the top page ?
- Should there be some kind of 'in-page' indication that an iframe is being monetized ? (@fruehle offhand suggested maybe some kind of WM logo watermark)

### Implementation PRs:

1. https://github.com/interledger/web-monetization-projects/pull/460
2. https://github.com/interledger/web-monetization-projects/pull/415

### Message Flow

| #   | Name                                        | Initiator        | Target           | Method                           | Payload Structure                                                                                        | Direct Response |
| --- | ------------------------------------------- | ---------------- | ---------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------- |
| 1   | checkIFrameIsAllowedFromIFrameContentScript | InitiatorContent | Background       | runtime.sendMessage              | { command: 'checkIFrameIsAllowedFromIFrameContentScript'}                                                | Yes             |
| 2   | checkIFrameIsAllowedFromBackground          | Background       | ParentContent    | tabs.sendMessage                 | { command: 'checkIFrameIsAllowedFromBackground', data: { frame: FrameSpec } }                            | Yes             |
| 3   | wmIFrameCorrelationId                       | ParentContent    | InitiatorContent | iframe.contentWindow.postMessage | { wmIFrameCorrelationId: string }                                                                        | No              |
| 4   | reportCorrelationIdFromIFrameContentScript  | InitiatorContent | Background       | runtime.sendMessage              | {command: 'reportCorrelationIdToParentContentScript', data: {frame: FrameSpec, correlationId: string } } | No              |
| 5   | reportCorrelationIdToParentContentScript    | Background       | ParentContent    | tabs.sendMessage                 | {command: 'reportCorrelationIdToParentContentScript', data: {frame: FrameSpec, correlationId: string } } | No              |

TODO: need to add the replies here above ^^

TODO: rename for clarity ?
checkIFrameIsAllowedFromIFrameContentScript -> initiatorRequestMonetizationCheck
checkIFrameIsAllowedFromBackground -> backgroundRequestParentIFrameCheck
wmIFrameCorrelationId -> parentSendCorrelationIdToInitiator
reportCorrelationIdFromIFrameContentScript -> initiatorReportCorrelationIdToBackground
reportCorrelationIdToParentContentScript -> backgroundForwardCorrelationIdToParent

### Relevant Code Excerpts

```typescript
export class BackgroundScript {
  // ...
  async checkIFrameIsAllowedFromIFrameContentScript(sender: MessageSender) {
    let frame = getFrameSpec(sender) as FrameSpec
    const { tabId, frameId } = frame

    if (frameId !== 0) {
      let allowed = true
      while (allowed) {
        const frameDetails = await this.framesService.getFrameAsync(frame)
        const parentId = frameDetails?.parentFrameId
        if (typeof parentId === 'undefined') {
          throw new Error(
            `expecting ${JSON.stringify(frame)} to have parentFrameId
            frameDetails=${JSON.stringify(frameDetails)}
            tabFrames=${JSON.stringify(
              this.framesService.getFrames(frame.tabId)
            )}
            `
          )
        }
        allowed = await this.framesService.sendCommand<
          CheckIFrameIsAllowedFromBackground,
          boolean
        >(
          { tabId, frameId: parentId },
          {
            command: 'checkIFrameIsAllowedFromBackground',
            data: {
              frame
            }
          }
        )
        if (parentId === 0) {
          break
        } else {
          frame = { tabId: frame.tabId, frameId: parentId }
        }
      }
      return allowed
    } else {
      throw new Error(`sender must be non top frame`)
    }
  }

  async reportCorrelationIdFromIFrameContentScript(
    request: ReportCorrelationIdFromIFrameContentScript,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const parentId = (await this.framesService.getFrameAsync(frame))
      ?.parentFrameId
    if (typeof parentId === 'undefined') {
      throw new Error(`expecting ${frame} to have parentFrameId`)
    }
    const message: ReportCorrelationIdToParentContentScript = {
      command: 'reportCorrelationIdToParentContentScript',
      data: {
        frame,
        correlationId: request.data.correlationId
      }
    }
    this.api.tabs.sendMessage(frame.tabId, message, { frameId: parentId })
  }
  // ...
}

export class Frames {
  // ...
  async checkIframeIsAllowedFromBackground(
    frameSpec: FrameSpec
  ): Promise<boolean> {
    const iframes = Array.from(
      this.doc.querySelectorAll<HTMLIFrameElement>('iframe')
    )
    for (const frameEl of iframes) {
      let result = this.frames.get(frameEl)
      if (!result) {
        const correlationId = uuid.v4()
        const framePromise = new Promise<FrameSpec>(resolve => {
          // Handler for this will report to background page with the correlationId
          // The background page will get the parentId from the frames service
          // The correlationId will be sent to the parent page which will then
          // find the promise in the queue and `resolve` it with {tabId, frameId}
          this.frameQueue.set(correlationId, { resolve })
          notNullOrUndef(frameEl.contentWindow).postMessage(
            {
              wmIFrameCorrelationId: correlationId
            },
            '*'
          )
        })
        const observer = new MutationObserver((records: MutationRecord[]) => {
          for (const record of records) {
            if (
              record.type === 'attributes' &&
              record.attributeName === 'allow'
            ) {
              framePromise.then(frame => {
                const cached = this.frames.get(frameEl)
                // Note that allow attribute may have changed, but it could have
                // been something else
                if (cached) {
                  const allowed = isMonetizationAllowed(frameEl)
                  if (cached.lastAllowed !== allowed) {
                    cached.lastAllowed = allowed
                    this.onAllowedChanged(allowed, frame)
                  }
                }
              })
            }
          }
        })
        framePromise.then(() => {
          observer.observe(frameEl, {
            attributes: true,
            attributeFilter: ['allow']
          })
        })
        result = {
          frame: framePromise,
          lastAllowed: false
        }
        this.frames.set(frameEl, result)
      }
      if (sameFrame(await result.frame, frameSpec)) {
        return (notNullOrUndef(this.frames.get(frameEl)).lastAllowed =
          isMonetizationAllowed(frameEl))
      }
    }
    return false
  }

  reportCorrelation(data: { frame: FrameSpec; correlationId: string }) {
    const key = data.correlationId
    const queued = this.frameQueue.get(key)
    if (queued) {
      this.frameQueue.delete(key)
      queued.resolve(data.frame)
    } else {
      // eslint-disable-next-line no-console
      if (this.loggingEnabled) {
        console.warn('unknown correlation id/frame', data)
      }
    }
  }
  // ...
}

class ContentScript {
  private async doStartMonetization(request: PaymentDetails) {
    if (this.frames.isIFrame) {
      const allowed = await new Promise<boolean>(resolve => {
        const message: CheckIFrameIsAllowedFromIFrameContentScript = {
          command: 'checkIFrameIsAllowedFromIFrameContentScript'
        }
        this.runtime.sendMessage(message, resolve)
      })
      if (!allowed) {
        // Always log this regardless of loggingEnabled setting as it's
        // reporting an error, rather than logging per se
        // eslint-disable-next-line no-console
        console.error(
          '<iframe> (or one of its ancestors) ' +
            'is not authorized to allow Web Monetization, %s',
          window.location.href
        )
        return
      }
    }
    // noinspection ES6MissingAwait
    void this.runtime.sendMessage(startWebMonetizationMessage(request))
  }

  init() {
    if (this.frames.isIFrame) {
      this.window.addEventListener('message', event => {
        const data = event.data
        if (typeof data.wmIFrameCorrelationId === 'string') {
          const message: ReportCorrelationIdFromIFrameContentScript = {
            command: 'reportCorrelationIdFromIFrameContentScript',
            data: {
              correlationId: data.wmIFrameCorrelationId
            }
          }
          void this.runtime.sendMessage(message)
        }
      })
    }
  }
  // ...
}
```
