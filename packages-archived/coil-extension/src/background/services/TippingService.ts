import { EventEmitter } from 'events'

import { GraphQlClient } from '@coil/client'
import { inject, injectable } from 'inversify'

import { StoreProxy } from '../../types/storage'
import * as tokens from '../../types/tokens'
import { TipSent } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'
import { TipAssets } from '../consts/AssetConstants'
import { User } from '../../types/user'

import { logger, Logger } from './utils'
import { Stream } from './Stream'
import { BackgroundFramesService } from './BackgroundFramesService'
import { formatTipSettings } from './formatTipSettings.util'

@injectable()
export class TippingService extends EventEmitter {
  constructor(
    @inject(tokens.StoreProxy)
    private store: StoreProxy,
    private client: GraphQlClient,
    @logger('TippingService')
    private log: Logger,
    private framesService: BackgroundFramesService,
    @inject(tokens.WextApi)
    private api: typeof chrome
  ) {
    super()
  }

  async updateTipSettings(
    token: string
  ): Promise<{ success: boolean; message: string }> {
    /*
      updateTipSettings is responsible for fetching the data needed for the tipping views -> tipSettings
      after it fetches the data it then formats the values to make it easier for the views to consume
    */
    try {
      const resp = await this.client.tipSettings(token)
      this.log('updateTippingSettings', resp)
      if (resp.data?.whoami && resp.data?.minTipLimit) {
        const formatted = formatTipSettings(resp.data)
        // update user object on local storage
        if (this.store.user) {
          this.store.user = {
            ...this.store.user,
            ...formatted
          }
        }
      }
      return { success: true, message: '' }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  async sendTip(
    tabId: number,
    streamId: string,
    stream: Stream,
    token: string | null
  ): Promise<TipSent> {
    if (!streamId) {
      this.log('can not find top frame for tabId=%d', tabId)
      throw new Error(`Can not find top frame for tabId ${tabId}`)
    }

    if (!stream || !token) {
      this.log(
        'sendTip: no stream | token. !!stream !!token ',
        !!stream,
        !!token
      )
      throw new Error('Either one or both of stream and token were undefined')
    }

    const receiver = stream.getPaymentPointer()
    const { assetCode, assetScale, exchangeRate } = stream.getAssetDetails()
    const amount = Math.floor(1e9 * exchangeRate).toString() // 1 USD, assetScale = 9

    this.log(`sendTip: sending tip to ${receiver}`)
    const result = await this.client.query({
      query: `
        mutation sendTip($receiver: String!) {
          sendTip(receiver: $receiver) {
            success
          }
        }
      `,
      token,
      variables: {
        receiver
      }
    })
    this.log(`sendTip: sent tip to ${receiver}`, result)
    return {
      command: 'tip',
      data: {
        paymentPointer: receiver,
        amount,
        assetCode,
        assetScale
      }
    }
  }

  public async tipPreview(
    tip: number,
    token: string
  ): Promise<{
    success: boolean
    message?: string
    creditCardCharge?: string
    tipCreditCharge?: string
  }> {
    if (!token) {
      this.log('tipPreview: token. !!token ', !!token)
      throw new Error('Token was undefined')
    }

    // Set tip amount
    const CENTS = 100
    const tipAmountCents = Math.floor(tip * CENTS).toString()

    try {
      this.log('tipPreview: requesting tip preview')

      const result = await this.client.tipPreview(token, tipAmountCents)

      return {
        success: true,
        creditCardCharge: result.charges.creditCardCharge,
        tipCreditCharge: result.charges.tipCreditCharge
      }
    } catch (e) {
      this.log(`tipPreview: error. msg=${e.message}`)
      throw new Error(e.message)
    }
  }

  public async tip(
    tip: number,
    tabId: number,
    receiver: string,
    token: string
  ): Promise<{ code: string; message: string; success: boolean }> {
    if (!receiver) {
      this.log('can not find top frame for tabId=%d', tabId)
      throw new Error('Stream was undefined')
    }

    if (!token) {
      this.log('tip: no token. !!token', !!token)
      throw new Error('Token was undefined')
    }

    // Set tip amount
    const CENTS = 100
    const tipAmountCents = Math.floor(tip * CENTS).toString()

    // Set active tab url
    const frameId = 0
    const frame = notNullOrUndef(
      this.framesService.getFrame({ frameId, tabId })
    )
    const activeTabUrl = frame.href

    try {
      this.log(`tip: sending tip to ${receiver}`)

      const result = await this.client.tip(token, {
        amountCentsUsd: tipAmountCents,
        destination: receiver,
        origin: activeTabUrl
      })

      this.log(`tip: sent tip to ${receiver}`, result)
      const message = {
        command: 'tip',
        data: {
          paymentPointer: receiver,
          amount: tipAmountCents,
          assetCode: TipAssets.assetCode,
          assetScale: TipAssets.assetScale
        }
      }
      this.api.tabs.sendMessage(tabId, message, { frameId: 0 })
      return result
    } catch (e) {
      this.log(`tip: error. msg=${e.message}`)
      console.warn(`tip: error. msg=${e.message}`)
      throw new Error(e.message)
    }
  }

  userCanTip() {
    const user: User | null = this.store?.user ?? null
    const userHasNewUi = user?.extensionNewUiFeatureFlag
    const userInTippingBeta = user?.tippingBetaFeatureFlag
    const userTipCreditBalance = user?.tipSettings?.totalTipCreditAmountUsd ?? 0
    const userHasTipCredits = userTipCreditBalance > 0
    return userHasNewUi && (userInTippingBeta || userHasTipCredits)
  }
}
