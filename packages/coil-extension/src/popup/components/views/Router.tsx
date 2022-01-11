// * This will replace the ViewRouter once the new UI is ready

import React from 'react'

import { useRouter } from '../../context/routerContext'
import { useStore } from '../../context/storeContext'
import { ROUTES } from '../../constants'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

import { SettingsView } from './SettingsView'
import { StreamingWebMonetizedView } from './StreamingWebMonitizedView'
import { StreamingNotWebMonetizedView } from './StreamingNotWebMonetizedView'
import { StreamingNoMembershipView } from './StreamingNoMembershipView'
import { StreamingCoilView } from './StreamingCoilView'
import { StreamingCoilDiscoverView } from './StreamingCoilDiscoverView'
import { TipView } from './TipView'
import { TipConfirmView } from './TipConfirmView'
import { TipCompleteView } from './TipCompleteView'
import { TipRouter } from './TipRouter'

//
// Component
//
export const Router = () => {
  const router = useRouter()
  const { user, monetized, coilSite } = useStore()

  switch (router.path) {
    // /settings
    case ROUTES.settings: {
      return <SettingsView />
    }
    // /tipping
    case ROUTES.tipping: {
      // /tipping
      return <TipView />
    }
    // /tipping/confirm
    case ROUTES.tippingConfirm: {
      // /tipping/confirm
      return <TipConfirmView />
    }
    // /tipping/complete
    case ROUTES.tippingComplete: {
      // /tipping/complete
      return <TipRouter />
    }
    // /streaming
    case ROUTES.streaming:
    default: {
      // check the logic for what state to display for the streaming page

      // Streaming - No Membership
      if (!user?.subscription?.active) {
        return <StreamingNoMembershipView />
      }

      // Streaming - Coil Site > Discover
      // Streaming - Coil Site
      if (coilSite && !monetized) {
        const { pathname } = new URL(coilSite)
        if (pathname === '/discover') {
          return <StreamingCoilDiscoverView />
        } else {
          return <StreamingCoilView />
        }
      }

      // Streaming - Web Monetized Site
      // Streaming - Not Web Monetized Site
      if (monetized) {
        return <StreamingWebMonetizedView />
      } else {
        return <StreamingNotWebMonetizedView />
      }
    }
  }
}
