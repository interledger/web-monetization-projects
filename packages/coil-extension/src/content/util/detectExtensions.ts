export function detectExtensionById(extensionId: string, runtime: any) {
  console.log('sending message to extension....')
  runtime.sendMessage(
    extensionId,
    { extensionExists: true },
    function (res: any) {
      if (runtime.lastError) {
        // message processing code goes here
        console.log('Secondary Extension not active')
        return
      }
      console.log('response received from secondary extension')
      console.log('response: ' + res.txt)
    }
  )
}
