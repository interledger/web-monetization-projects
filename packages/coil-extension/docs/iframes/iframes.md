# Iframes

### Problem Statement:

We need to determine if monetization is allowed in the initiatorContentScript (the content script running inside the `<iframe>` that initiates the monetization check).

To do this, we must identify the `<iframe>` element in the parentContentScript
(content script running in the parent frame) that corresponds to the initiatorContentScript.
Then, we must verify if the monetization is allowed based on the `<iframe>` element's attributes,
such as its allow attribute, which should include 'monetization' in its feature set policy for
monetization to be allowed.

Additionally, for nested iframes, all the parent iframes in the chain of ancestors must have the 'monetization'
feature set in their allow attributes for monetization to be allowed in the nested iframe.

Note that iframes may be from various origins, not necessarily the top frame in a tab.

Unfortunately, there's currently no extension api for getting a frameId from a frame element.
One has been proposed, and the api implemented by Apple/Mozilla as experimental, however Google have security concerns
and the issue has stalled. See: https://github.com/w3c/webextensions/issues/12

We must therefore use whatever tools we have at our disposal to determine the frame.

### Terms:

- **parentContentScript**: Content script running in the parent frame.
- **initiatorContentScript**: Content script running inside the `<iframe>` that initiates the monetization check.
- **backgroundScript**: The background script of the extension.

### Available Tools and Methods:

We can put together some solution using some of the following:

- **webNavigation API**: It can be used in the backgroundScript to obtain details about frames, including their parent frames and frame IDs. Useful methods include webNavigation.getAllFrames() to get a list of frames in a tab, and webNavigation.getFrame() to get details about a specific frame in a tab.
- **chrome.runtime.sendMessage()**: This method allows content scripts to send messages to the background script.
- **chrome.tabs.sendMessage()**: This method can be used to send messages from the background script to a specific content script running in a frame identified by a tabId and frameId (or all frames).
- **chrome.runtime.onMessage**: This event can be used to listen for messages sent between components.
- **window.postMessage()**: This method can be used to send messages between windows (or iframes) in a secure way. It can be used to communicate between the initiatorContentScript and the parentContentScript.
- **iframe.contentWindow**: This property of an `<iframe>` element provides access to the Window object of the document inside the iframe and can be used to send messages between the parent and child documents using the postMessage() method.
- **window.parent**: This property in the initiatorContentScript can be used to reference the parent window (the window containing the iframe).
- **event.source**: When handling a message event, this property can be used to get the Window object of the message sender. It can be used in the parentContentScript to compare the source of the message with the contentWindow property of each iframe.

### Security Concerns:

To prevent potential security vulnerabilities, message payloads sent between frames using postMessage() should only include correlationIds and not include other information, such as frameId or tabId. This is because correlationIds can be generated randomly and do not reveal any sensitive information about the frame or tab. If other information is included, it could potentially reveal sensitive information and open up the possibility for eavesdropping.

It's possible to do matching of event.source (of 'message' event) against iframe.contentWindow
to do correlation though it's unclear how that could be done with out sending the frameId/tabId.

### Solution overview

The following is how iframe monetization is implemented. It's possible there's a simpler way which
doesn't need the webNavigation api (maybe using window.parent.postMessage to get frame ancestry),
though if you are requesting <all_urls> the permission UX is largely unchanged.

1. The initiatorContentScript sends a request to the backgroundScript to check if monetization is allowed for the iframe.
2. The backgroundScript determines the parent frame and sends a request to the parentContentScript to verify if the iframe's monetization is allowed based on its attributes.
3. The parentContentScript generates a unique correlationId for each unknown iframe, sends it to the corresponding content script using window.postMessage(), and awaits a response. Note that the message might be sent to a random iframe's content script and not necessarily the initiatorContentScript.
4. The content script that receives the correlationId (which could be the initiatorContentScript or another content script) sends the correlationId to the backgroundScript.
5. The backgroundScript forwards the correlationId to the parentContentScript.
6. The parentContentScript matches the iframe element with the received correlationId and completes the request, allowing the backgroundScript to respond to the initiatorContentScript with the iframe's monetization status.

(This section is ripped from the PR and could do with some rewriting)

To do so, it takes advantage of:

1. [webNavigation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation) wext apis
   - BackgroundFrameService
     - Keeps track of frames, including the current readyState/url/parentFrameId etc.
     - use `frameChanged` event where using chrome.tabs.onUpdated before (which was [problematic](https://github.com/coilhq/web-monetization-projects/issues/203))
   - Requires extra permissions which may be off-putting to some users
     - This will not actually give us any more private information than we already have. This may not be clear to all users though.
2. [MessageSender](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome/index.d.ts#L5500-L5505)['frameId'], MessageSender['tab'] attributes
   Messages sent using `chrome.runtime.sendMessage` api from content scripts
   will be received in the background script onMessage listener with
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

### Questions That Came up:

- Should we limit the amount of concurrently monetized frames ?
  - If so, how ?
    - We just let the backend do the limiting
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
| 4   | reportCorrelationIdFromIFrameContentScript  | InitiatorContent | Background       | runtime.sendMessage              | {command: 'reportCorrelationIdFromIFrameContentScript', data: {correlationId: string } }                 | No              |
| 5   | reportCorrelationIdToParentContentScript    | Background       | ParentContent    | tabs.sendMessage                 | {command: 'reportCorrelationIdToParentContentScript', data: {frame: FrameSpec, correlationId: string } } | No              |

1. The initiating script sends a "checkIFrameIsAllowedFromIFrameContentScript" request (1) to the background script and awaits a response.
2. The background script identifies the frameId and tabId, consults the frame service to find the parent id, and sends a "checkIFrameIsAllowedFromBackground" request (2) to the parent content script, awaiting a response.
3. The parent content script generates a unique correlationId for each unknown iframe element, stores them in a map with the correlationId as the key and a frame resolve callback as the value. It then `await`s for the frames to resolve.
4. The parent script sends a "wmIFrameCorrelationId" (3) message to the iframes using window.postMessage.
5. Each iframe sends a "reportCorrelationIdFromIFrameContentScript" (4) message to the background script, with the frameId implied by the sender.
6. The background script looks up the parent frame and sends the "reportCorrelationIdToParentContentScript" (5) message (along with the implied frameId and tabId) to the parent script.
7. The parent script looks up the iframe associated with the given correlationId from the map, retrieves the corresponding frame resolve callback, and invokes it.
8. The parent script can now check which iframe element matches the frame spec and complete the request (2), allowing the background script to provide the response (1) to the initiator content script.

TODO: rename for clarity ?
checkIFrameIsAllowedFromIFrameContentScript -> iframesInitiatorRequestMonetizationCheck
checkIFrameIsAllowedFromBackground -> iframesBackgroundRequestParentIFrameCheck
wmIFrameCorrelationId -> iframesParentSendCorrelationIdToInitiator
reportCorrelationIdFromIFrameContentScript -> iframesInitiatorReportCorrelationIdToBackground
reportCorrelationIdToParentContentScript -> iframesBackgroundForwardCorrelationIdToParent

TODO: need to add the replies to the table

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
