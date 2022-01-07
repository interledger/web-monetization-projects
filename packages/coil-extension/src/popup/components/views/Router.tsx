// * This will replace the ViewRouter once the new UI is ready

import React from 'react'

import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../contants'
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
  switch (router.path) {
    case ROUTES.settings: {
      // /settings
      return <SettingsView />
    }
    case ROUTES.tipping: {
      // /tipping
      return (
        <NewHeaderFooterLayout title='Tip This Site'>
          <div>Tipping</div>
          <button onClick={() => router.to(ROUTES.tippingConfirm)}>next</button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.tippingConfirm: {
      // /tipping/confirm
      return (
        <div>
          tipping confirm
          <button onClick={() => router.to(ROUTES.tippingComplete)}>
            next
          </button>
        </div>
      )
    }
    case ROUTES.tippingComplete: {
      // /tipping/complete
      return (
        <NewHeaderFooterLayout>
          <div>tipping complete</div>
          <button onClick={() => router.to(ROUTES.streaming)}>home</button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.streamingNoWebMo: {
      // /streaming/notmonetized
      return <StreamingNotWebMonetizedView />
    }
    case ROUTES.streamingNoMembership: {
      // /streaming/nomembership
      return <StreamingNoMembershipView />
    }
    case ROUTES.streamingCoil: {
      // /streaming/coil
      return <StreamingCoilView />
    }
    case ROUTES.streamingCoilDiscover: {
      // /streaming/coil/discover
      return <StreamingCoilDiscoverView />
    }
    case ROUTES.streaming: // /streaming
    default: {
      // this page should check the logic for what to display
      return <StreamingWebMonetizedView />
    }
  }
}
