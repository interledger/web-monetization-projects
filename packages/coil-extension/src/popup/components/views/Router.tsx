// * This will replace the ViewRouter once the new UI is ready

import React from 'react'

import { useRouter } from '../../context/routerContext'
import { useStore } from '../../context/storeContext'
import { ROUTES } from '../../contants'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

import { SettingsView } from './SettingsView'
import { StreamingWebMonetizedView } from './StreamingWebMonitizedView'
import { StreamingNotWebMonetizedView } from './StreamingNotWebMonetizedView'
import { StreamingNoMembershipView } from './StreamingNoMembershipView'
import { StreamingCoilView } from './StreamingCoilView'
import { StreamingCoilDiscoverView } from './StreamingCoilDiscoverView'
import { TipRouter } from './TipRouter'

//
// Component
//
export const Router = () => {
  const router = useRouter()
  const { validToken, user, monetized, coilSite } = useStore()

  switch (router.path) {
    // /settings
    case ROUTES.settings: {
      return <SettingsView />
    }
    // /tipping
    case ROUTES.tipping: {
      return (
        <NewHeaderFooterLayout title='Tip This Site'>
          <TipRouter />
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
    // /streaming/monetized
    case ROUTES.streamingWebMo: {
      return <StreamingWebMonetizedView />
    }
    // /streaming/notmonetized
    case ROUTES.streamingNoWebMo: {
      return <StreamingNotWebMonetizedView />
    }
    // /streaming/nomembership
    case ROUTES.streamingNoMembership: {
      return <StreamingNoMembershipView />
    }
    // /streaming/coil
    case ROUTES.streamingCoil: {
      return <StreamingCoilView />
    }
    // /streaming/coil/discover
    case ROUTES.streamingCoilDiscover: {
      return <StreamingCoilDiscoverView />
    }
    // /streaming
    case ROUTES.streaming:
    default: {
      // this page should check the logic for what to display

      // redirect to /streaming/nomembership
      if (
        !user?.subscription ||
        (user.subscription && !user.subscription.active)
      ) {
        // router.to(ROUTES.streamingNoMembership)
        // return null
        return <StreamingNoMembershipView />
      }

      // redirect to /streaming/coil/discover
      // redirect to /streaming/coil
      if (coilSite && !monetized) {
        const { pathname } = new URL(coilSite)
        if (pathname === '/discover') {
          // router.to(ROUTES.streamingCoilDiscover)
          // return null
          return <StreamingCoilDiscoverView />
        } else {
          // router.to(ROUTES.streamingCoil)
          // return null
          return <StreamingCoilView />
        }
      }

      // redirect to /streaming/monetized
      // redirect to /streaming/notmonetized
      if (monetized) {
        // router.to(ROUTES.streamingWebMo)
        // return null
        return <StreamingWebMonetizedView />
        // handles the monetized views based on local state
      } else {
        // Non Monetized Page
        // router.to(ROUTES.streamingNoWebMo)
        // return null
        return <StreamingNotWebMonetizedView />
      }

      return null
    }
  }
}
