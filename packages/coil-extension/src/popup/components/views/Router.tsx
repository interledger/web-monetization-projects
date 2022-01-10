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
      return (
        <NewHeaderFooterLayout title='Tip This Site'>
          <div>Tipping</div>
          <button onClick={() => router.to(ROUTES.tippingConfirm)}>next</button>
        </NewHeaderFooterLayout>
      )
    }
    // /tipping/confirm
    case ROUTES.tippingConfirm: {
      return (
        <div>
          tipping confirm
          <button onClick={() => router.to(ROUTES.tippingComplete)}>
            next
          </button>
        </div>
      )
    }
    // /tipping/complete
    case ROUTES.tippingComplete: {
      return (
        <NewHeaderFooterLayout>
          <div>tipping complete</div>
          <button onClick={() => router.to(ROUTES.streaming)}>home</button>
        </NewHeaderFooterLayout>
      )
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
