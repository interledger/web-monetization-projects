export function addCoilExtensionInstalledMarker(document: Document) {
  // Appending coil extension installed marker first so the coil site can find it asap.
  document.addEventListener('checkCoilExtension', () => {
    const installedMarker = document.createElement('div')
    installedMarker.setAttribute('id', 'coil_extension_installed_marker')
    document.body.appendChild(installedMarker)
    const coilEvent = new Event('addCoil')
    document.dispatchEvent(coilEvent)
  })
}
