export function whenDocumentReady(document: HTMLDocument, start: Function) {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    start()
  } else {
    document.addEventListener(
      'readystatechange',
      () => {
        if (document.readyState === 'interactive') {
          start()
        }
      },
      { once: true }
    )
  }
}
