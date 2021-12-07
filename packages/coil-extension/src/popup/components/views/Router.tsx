// * This will replace the ViewRouter once the new UI is ready

import React from 'react'

import { useRouter } from '../../context/routerContext'
import { ROUTES } from '../../contants'
import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'

//
// Component
//
export const Router = () => {
  const router = useRouter()
  switch (router.path) {
    case ROUTES.settings: {
      // /settings
      return (
        <NewHeaderFooterLayout title='Settings'>
          <div>settings</div>
        </NewHeaderFooterLayout>
      )
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
      return (
        <NewHeaderFooterLayout title='Streaming Payments'>
          <div>Not WebMonetized</div>
          <button onClick={() => router.to(ROUTES.streamingNoMembership)}>
            no membership
          </button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.streamingNoMembership: {
      // /streaming/nomembership
      return (
        <NewHeaderFooterLayout title='Streaming Payments'>
          <div>No Membership</div>
          <button onClick={() => router.to(ROUTES.streamingCoil)}>
            coil site
          </button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.streamingCoil: {
      // /streaming/coil
      return (
        <NewHeaderFooterLayout title='Streaming Payments'>
          <div>Coil Site</div>
          <button onClick={() => router.to(ROUTES.streamingCoilDiscover)}>
            coil site discover
          </button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.streamingCoilDiscover: {
      // /streaming/coil/discover
      return (
        <NewHeaderFooterLayout title='Streaming Payments'>
          <div>Coil Discover</div>
          <button onClick={() => router.to(ROUTES.streaming)}>
            streaming home
          </button>
        </NewHeaderFooterLayout>
      )
    }
    case ROUTES.streaming: // /streaming
    default: {
      // this page should check the logic for what to display
      return (
        <NewHeaderFooterLayout title='Streaming Payments'>
          <div>streaming</div>
          <button onClick={() => router.to(ROUTES.streamingNoWebMo)}>
            no webmo
          </button>
        </NewHeaderFooterLayout>
      )
    }
  }
}
