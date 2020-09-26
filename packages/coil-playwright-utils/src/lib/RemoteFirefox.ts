const log = console

export class RemoteFirefox {
  checkedForAddonReloading: boolean

  constructor(private client: any) {
    this.client = client
    this.checkedForAddonReloading = false

    client.client.on('disconnect', () => {
      log.debug('Received "disconnect" from Firefox client')
    })
    client.client.on('end', () => {
      log.debug('Received "end" from Firefox client')
    })
    client.client.on('message', (info: any) => {
      // These are arbitrary messages that the client library ignores.
      log.debug(`Received message from client: ${JSON.stringify(info)}`)
    })
  }

  disconnect() {
    this.client.disconnect()
  }

  addonRequest(addon: any, request: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.client.makeRequest(
        { to: addon.actor, type: request },
        (response: any) => {
          if (response.error) {
            const error = `${response.error}: ${response.message}`
            log.debug(
              `Client responded to '${request}' request with error:`,
              error
            )
            reject(new /*WebExt*/ Error(error))
          } else {
            resolve(response)
          }
        }
      )
    })
  }

  getAddonsActor(): Promise<string> {
    return new Promise((resolve, reject) => {
      // getRoot should work since Firefox 55 (bug 1352157).
      this.client.request('getRoot', (err: any, actors: any) => {
        if (!err) {
          if (actors.addonsActor) {
            resolve(actors.addonsActor)
          } else {
            reject(
              new /*RemoteTempInstallNotSupported*/ Error(
                'This version of Firefox does not provide an add-ons actor for ' +
                  'remote installation.'
              )
            )
          }
          return
        }
        log.debug(`Falling back to listTabs because getRoot failed: ${err}`)
        // Fallback to listTabs otherwise, Firefox 49 - 77 (bug 1618691).
        this.client.request('listTabs', (error: Error, tabsResponse: any) => {
          if (error) {
            return reject(
              new /*WebExt*/ Error(`Remote Firefox: listTabs() error: ${error}`)
            )
          }
          // addonsActor was added to listTabs in Firefox 49 (bug 1273183).
          if (!tabsResponse.addonsActor) {
            log.debug(
              'listTabs returned a falsey addonsActor: ' +
                `${tabsResponse.addonsActor}`
            )
            return reject(
              new /*RemoteTempInstallNotSupported*/ Error(
                'This is an older version of Firefox that does not provide an ' +
                  'add-ons actor for remote installation. Try Firefox 49 or ' +
                  'higher.'
              )
            )
          }
          resolve(tabsResponse.addonsActor)
        })
      })
    })
  }

  installTemporaryAddon(
    addonPath: string
  ): Promise</*FirefoxRDPResponseAddon*/ any> {
    return new Promise((resolve, reject) => {
      this.getAddonsActor()
        .then(addonsActor => {
          this.client.client.makeRequest(
            {
              to: addonsActor,
              type: 'installTemporaryAddon',
              addonPath
            },
            (installResponse: any) => {
              if (installResponse.error) {
                return reject(
                  new /*WebExt*/ Error(
                    'installTemporaryAddon: Error: ' +
                      `${installResponse.error}: ${installResponse.message}`
                  )
                )
              }
              log.debug(
                `installTemporaryAddon: ${JSON.stringify(installResponse)}`
              )
              log.info(`Installed ${addonPath} as a temporary add-on`)
              resolve(installResponse)
            }
          )
        })
        .catch(reject)
    })
  }

  getInstalledAddon(addonId: string): Promise</*FirefoxRDPAddonActor*/ any> {
    return new Promise((resolve, reject) => {
      this.client.request('listAddons', (error: Error, response: any) => {
        if (error) {
          reject(
            new /*WebExt*/ Error(`Remote Firefox: listAddons() error: ${error}`)
          )
        } else {
          resolve(response.addons)
        }
      })
    }).then((addons: any) => {
      for (const addon of addons) {
        if (addon.id === addonId) {
          return addon
        }
      }
      log.debug(
        `Remote Firefox has these addons: ${addons.map((a: any) => a.id)}`
      )
      throw new /*WebExt*/ Error(
        'The remote Firefox does not have your extension installed'
      )
    })
  }

  async checkForAddonReloading(
    addon: /*FirefoxRDPAddonActor*/ any
  ): Promise</*FirefoxRDPAddonActor*/ any> {
    if (this.checkedForAddonReloading) {
      // We only need to check once if reload() is supported.
      return addon
    } else {
      const response = await this.addonRequest(addon, 'requestTypes')

      if (response.requestTypes.indexOf('reload') === -1) {
        const supportedRequestTypes = JSON.stringify(response.requestTypes)
        log.debug(`Remote Firefox only supports: ${supportedRequestTypes}`)
        throw new /*Usage*/ Error(
          'This Firefox version does not support add-on reloading. ' +
            'Re-run with --no-reload'
        )
      } else {
        this.checkedForAddonReloading = true
        return addon
      }
    }
  }

  async reloadAddon(addonId: string): Promise<void> {
    const addon = await this.getInstalledAddon(addonId)
    await this.checkForAddonReloading(addon)
    await this.addonRequest(addon, 'reload')
    process.stdout.write(
      `\rLast extension reload: ${new Date().toTimeString()}`
    )
    log.debug('\n')
  }
}
