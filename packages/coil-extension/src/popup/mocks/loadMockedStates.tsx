import { EventEmitter } from 'events'

import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

import { PopupStateType } from '../services/PopupState'
import { PopupHost, PopupRuntime } from '../types'
import { API } from '../../webpackDefines'
import { StorageService } from '../../services/storage'
import { User } from '../../types/user'
import { defaultPopupHost } from '../context/popupHostContext'
import { StorageEventPartial } from '../context/storeContext'
import { Index } from '../Index'
import { ROUTES } from '../constants'

import { StatePanel } from './StatePanel'

export const isExtension = Boolean(API && API.runtime && API.runtime.id)

export function makeStorage(mock: any): Pick<StorageService, 'get' | 'set'> {
  return {
    get<T = any>(key: string): T | null {
      return mock[key] || null
    },
    set(key: string, value: any) {
      mock[key] = value
    }
  }
}

const user = {
  id: 'cjmbxifo0leaf0711ilgecwdb',
  fullName: 'Nicholas Dudfield',
  email: 'mock-email@coil.com',
  customerId: 'cus_EmQtvoQVyJgZ75',
  subscription: { active: true },
  invitation: { usedAt: '2018-09-22T00:28:32.714Z' },
  currencyPreferences: { code: 'USD', scale: 9 }
}

const tipUserNewUi = {
  newUi: true,
  id: 'cjmbxifo0leaf0711ilgecwdb',
  canTip: true,
  fullName: 'Michael Will',
  shortName: 'mwill',
  email: 'mock-email@coil.com',
  profilePicture: 'https://cdn.coil.com/images/msPiV_0ZS928Fc-HJcdVAw.jpg',
  customerId: 'cus_EmQtvoQVyJgZ75',
  subscription: { active: true },
  invitation: { usedAt: '2018-09-22T00:28:32.714Z' },
  currencyPreferences: { code: 'USD', scale: 9 },
  tipSettings: {
    minTipLimitAmountUsd: 1,
    limitRemainingAmountUsd: 100,
    lastTippedAmountUsd: 25,
    hotkeyTipAmountsUsd: [5, 10, 50],
    totalTipCreditAmountUsd: 20
  },
  paymentMethods: [
    {
      id: 'test-id-stripe',
      type: 'stripe',
      details: {
        last4: '5678',
        brandCode: 'MasterCard',
        status: 'Valid'
      }
    },
    {
      id: 'test-id-tip',
      type: 'tipCredit',
      details: null
    }
  ],
  tippingBetaFeatureFlag: true,
  extensionNewUiFeatureFlag: true
}
const tipUserNewUiCompare = {
  newUi: true,
  id: 'cjmbxifo0leaf0711ilgecwdb',
  canTip: true,
  fullName: 'Michael Will',
  shortName: 'mwill',
  email: 'mock-email@coil.com',
  profilePicture: 'https://cdn.coil.com/images/msPiV_0ZS928Fc-HJcdVAw.jpg',
  customerId: 'cus_EmQtvoQVyJgZ75',
  subscription: { active: false },
  invitation: { usedAt: '2018-09-22T00:28:32.714Z' },
  currencyPreferences: { code: 'USD', scale: 9 },
  tipSettings: {
    minTipLimitAmountUsd: 1,
    limitRemainingAmountUsd: 30,
    lastTippedAmountUsd: 25,
    hotkeyTipAmountsUsd: [5, 10, 50],
    totalTipCreditAmountUsd: 20
  },
  paymentMethods: [
    {
      id: 'test-id-stripe',
      type: 'stripe',
      details: {
        last4: '5678',
        brandCode: 'MasterCard',
        status: 'Valid'
      }
    },
    {
      id: 'test-id-tip',
      type: 'tipCredit',
      details: null
    }
  ],
  tippingBetaFeatureFlag: true,
  extensionNewUiFeatureFlag: true
}

function mockState(partial: Partial<PopupStateType>): PopupStateType {
  const ret: PopupStateType = {
    validToken: null,
    user: null,
    adapted: null,
    monetized: null,
    stickyState: null,
    playState: null,
    monetizedTotal: null,
    coilSite: null,
    'popup-route:last': null,
    'popup-route:tipping-shown': null
  }
  return { ...ret, ...partial }
}

const userCanTipNewUi = mockState({
  monetized: true,
  // coilSite: 'https://coil.com/p/mirrae/Letter-to-my-Daughter/-ZInTJqN-',
  // coilSite: 'https://coil.com/discover',
  monetizedTotal: 0,
  user: tipUserNewUi,
  validToken: true,
  adapted: false
})

const userCanTipNewUiCompare = mockState({
  monetized: false,
  // coilSite: 'https://coil.com/p/mirrae/Letter-to-my-Daughter/-ZInTJqN-',
  // coilSite: 'https://coil.com/discover',
  monetizedTotal: 10854,
  user: tipUserNewUiCompare,
  validToken: true,
  adapted: false
})

const notSupported = mockState({
  monetizedTotal: 0,
  user: user,
  validToken: true,
  adapted: false
})

const payingCoilArticle = mockState({
  monetized: true,
  coilSite: 'https://coil.com/p/mirrae/Letter-to-my-Daughter/-ZInTJqN-',
  monetizedTotal: 10854,
  user: user,
  validToken: true,
  adapted: false
})

const startDiscovering = mockState({
  coilSite: 'https://coil.com/discover',
  monetizedTotal: 0,
  user: user,
  validToken: true,
  adapted: false
})

const payingYouTube = mockState({
  monetized: true,
  monetizedTotal: 2326667,
  playState: 'playing',
  stickyState: 'auto',
  user: user,
  validToken: true,
  adapted: true
})

const payingTwitch = mockState({
  monetized: true,
  monetizedTotal: 5910000,
  playState: 'playing',
  stickyState: 'auto',
  user: user,
  validToken: true,
  adapted: true
})

const lastTipping = mockState({
  'popup-route:last': ROUTES.tipping,
  'popup-route:tipping-shown': true,
  monetized: true,
  monetizedTotal: 5910000,
  playState: 'playing',
  stickyState: 'auto',
  user: tipUserNewUi,
  validToken: true,
  adapted: true
})

const lastStreaming = mockState({
  'popup-route:last': ROUTES.streaming,
  'popup-route:tipping-shown': false,
  monetized: true,
  monetizedTotal: 5910000,
  stickyState: 'auto',
  user: tipUserNewUi,
  validToken: true,
  adapted: true
})

const lastStreamingWithTip = mockState({
  'popup-route:last': ROUTES.streaming,
  'popup-route:tipping-shown': true,
  monetized: true,
  monetizedTotal: 5910000,
  stickyState: 'auto',
  user: tipUserNewUi,
  validToken: true,
  adapted: true
})

const payingNonCoilSite = mockState({
  monetized: true,
  monetizedTotal: 22817800,
  user: user,
  validToken: true,
  adapted: false
})

const welcomeToCoil = mockState({
  coilSite: 'https://coil.com/',
  monetizedTotal: 0,
  user: user,
  validToken: true,
  adapted: false
})

const aliceUser: User = {
  id: 'cjlcvi8fr002m07113mklvsck',
  fullName: 'Alice Lee',
  email: 'mock-email@coil.com',
  customerId: undefined,
  subscription: undefined,
  invitation: undefined,
  currencyPreferences: undefined
}

const aliceUnsubscribed = mockState({
  monetizedTotal: 0,
  user: aliceUser,
  validToken: true,
  adapted: false
})

const MOCK_STATES = [
  { name: 'New Extension UI', state: userCanTipNewUi },
  { name: 'New Extension UI Compare', state: userCanTipNewUiCompare },
  { name: 'Paying Coil Article', state: payingCoilArticle },
  { name: 'Not Supported', state: notSupported },
  { name: 'Start Discovering', state: startDiscovering },
  { name: 'Paying', state: payingNonCoilSite },
  { name: 'Welcome To Coil', state: welcomeToCoil },
  { name: 'Alice Unsubscribed', state: aliceUnsubscribed },
  { name: 'Paying Youtube', state: payingYouTube },
  { name: 'Paying Twitch', state: payingTwitch },
  { name: 'Last Route Tipping', state: lastTipping },
  { name: 'Last Route Streaming', state: lastStreaming },
  { name: 'Last Route Streaming - Tipping', state: lastStreamingWithTip }
]

const argsLogger = (name: string) => {
  return console.log.bind(console, name)
}

class MockRuntime extends EventEmitter implements PopupRuntime {
  tabOpener = ((...args: any) => {
    return argsLogger('openTab: ' + args.join(' '))
  }) as any

  onMessageAddListener = (func: any) => {
    this.addListener('message', func)
  }

  onMessageRemoveListener = (func: any) => {
    this.removeListener('message', func)
  }

  sendMessage = argsLogger('sendMessage stub: ')

  triggerOnMessage(message: any) {
    this.emit('message', message)
  }
}

const embossedBorder = {
  borderRight: '1px solid #CCC',
  borderBottom: '1px solid #CCC',
  borderLeft: '1px solid #FFF',
  borderTop: '1px solid #FFF'
}

const useStyles = makeStyles(theme => {
  return {
    root: {
      background: '#DDD',
      padding: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    inner: {
      maxWidth: '1132px',
      margin: '0 auto',
      boxSizing: 'border-box'
    },
    layoutContainer: {
      flexDirection: 'column-reverse',
      width: '100%'
    },
    paper: {
      borderRadius: 2,
      background: '#FFF'
    },
    heading: {
      variant: 'h3',
      align: 'center',
      marginTop: '0.75rem',
      padding: '1rem 0',
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightBold
    },
    popup: {
      margin: '0.5rem 0',
      paddingBottom: '1.5rem',
      transition: 'all 0.2s ease-in-out',
      border: '1px solid transparent',
      background: 'rgba(255,255,255,0.16)'
    },
    statePanel: {
      ...embossedBorder,
      marginTop: '1.475rem',
      background: 'rgba(255, 255, 255, 0.4)'
    },
    active: {
      ...embossedBorder,
      background: 'rgba(255, 255, 255, 0.4)'
    },
    statePanelWrap: {
      background: '#CCC'
    },
    [theme.breakpoints.up('md')]: {
      layoutContainer: {
        flexDirection: 'row'
      }
    }
  } as const
})

const mockRuntime: MockRuntime = new MockRuntime()
const mockHosts = MOCK_STATES.map((mock, i) => {
  const key = `${i}-${mock.name}`
  const mockHost: PopupHost = {
    ...defaultPopupHost,
    key,
    // Each popup needs its own set of events
    events: new EventEmitter(),
    runtime: mockRuntime
  }
  return mockHost
})

export const mockPopupsPage = () => {
  return function MockPopupsPage() {
    const classes = useStyles()

    const [popupSelectedTitle, setPopupSelectedTitle] = useState(
      MOCK_STATES[0].name
    )
    const [popupSelectedState, setPopupSelectedState] = useState(
      MOCK_STATES[0].state
    )
    const [selected, setSelected] = useState(0)
    const [initiated, setInitiated] = useState(false)

    const popups = MOCK_STATES.map(({ name, state }, i) => {
      const storage = makeStorage(state)
      const key = `${i}-${name}`
      const mockHost = mockHosts[i]
      if (name.search(/paying/i) != -1 && !initiated) {
        let value = 10
        setInterval(() => {
          const newValue = (value += 10)
          state.monetizedTotal = newValue

          const message: StorageEventPartial = {
            key: 'monetizedTotal',
            newValue: JSON.stringify(newValue)
          }
          mockHost.events.emit('storage', message)
        }, 1500)
        setInitiated(true)
      }

      return (
        <Grid
          onClick={() => {
            setPopupSelectedTitle(name)
            setPopupSelectedState(state)
            setSelected(i)
          }}
          justify='space-around'
          alignContent='center'
          className={`${classes.popup} ${
            i === selected ? classes.active : classes.popup
          }`}
          container
          direction='column'
          key={key}
        >
          <Typography className={classes.heading}>{name}</Typography>
          <Index storage={storage} host={mockHost} />
        </Grid>
      )
    })

    const parentRef = useRef<HTMLDivElement>(null)

    return (
      <div className={classes.root}>
        <div className={classes.inner}>
          <Grid
            container
            className={classes.layoutContainer}
            justify='center'
            alignContent='center'
            spacing={4}
            alignItems='stretch'
          >
            <Grid item xs={12} md={6} lg={5}>
              <Grid
                alignContent='center'
                container
                direction='column'
                alignItems='stretch'
              >
                {popups}
              </Grid>
            </Grid>
            <Grid
              ref={parentRef}
              item
              xs={12}
              md={6}
              lg={7}
              className={classes.statePanel}
            >
              <StatePanel
                parent={parentRef}
                heading={popupSelectedTitle}
                body={popupSelectedState}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
