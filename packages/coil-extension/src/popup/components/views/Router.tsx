// * This will replace the ViewRouter once the new UI is ready

import React from 'react'

import { useRouter } from '../../context/routerContext'
import { useStore } from '../../context/storeContext'
import { ROUTES } from '../../constants'

import { SettingsView } from './SettingsView'
import { StreamingWebMonetizedView } from './StreamingWebMonitizedView'
import { StreamingNotWebMonetizedView } from './StreamingNotWebMonetizedView'
import { StreamingNoMembershipView } from './StreamingNoMembershipView'
import { StreamingCoilView } from './StreamingCoilView'
import { StreamingCoilDiscoverView } from './StreamingCoilDiscoverView'
import { TipView } from './TipView'
import { TipConfirmView } from './TipConfirmView'
import { TipCompleteView } from './TipCompleteView'
import { TipNonMonetizedView } from './TipNonMonetizedView'

//
// Component
//
export const Router = ({ path }: { path: string }): React.ReactElement => {
  const router = useRouter()
  const { user, monetized, coilSite } = useStore()

  switch (path) {
    // /settings
    case ROUTES.settings: {
      return <SettingsView key='settings-view' />
    }
    // /tipping
    case ROUTES.tipping: {
      // /tipping

      // Tipping - non monetized site | Coil site
      if (!monetized) {
        return <TipNonMonetizedView key='tipping-non-monetized-view' />
      }

      // Tipping - monetized sites
      return <TipView key='tipping-view:' />
    }
    // /tipping/confirm
    case ROUTES.tippingConfirm: {
      // /tipping/confirm
      return <TipConfirmView key='tipping-confirm-view' />
    }
    // /tipping/complete
    case ROUTES.tippingComplete: {
      // /tipping/complete
      return <TipCompleteView key='tipping-complete-view' />
    }
    // /streaming
    case ROUTES.streaming:
    default: {
      // check the logic for what state to display for the streaming page

      // Streaming - No Membership
      if (monetized && !user?.subscription?.active) {
        return <StreamingNoMembershipView key='streaming-no-membership-view' />
      }

      // Streaming - Coil Site > Discover
      // Streaming - Coil Site
      if (coilSite && !monetized) {
        const { pathname } = new URL(coilSite)
        if (pathname === '/discover') {
          return (
            <StreamingCoilDiscoverView key='streaming-coil-discover-view' />
          )
        } else {
          return <StreamingCoilView key='streaming-coil-view' />
        }
      }

      // Streaming - Web Monetized Site
      // Streaming - Not Web Monetized Site
      if (monetized) {
        return <StreamingWebMonetizedView key='streaming-web-monetized-view' />
      } else {
        return (
          <StreamingNotWebMonetizedView key='streaming-not-web-monetized-view' />
        )
      }
    }
  }
}
