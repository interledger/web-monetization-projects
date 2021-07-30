chrome.devtools.panels.sources.onSelectionChanged.addListener(() => {
  console.log('selection changed')
})

chrome.devtools.panels.create(
  'Coil',
  '/res/icn-coil-ext@4x.png',
  'static/devtoolsPanel.html'
)

export {}
