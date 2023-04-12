import '@abraham/reflection'

import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Amount } from '@webmonetization/types'
import {
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  styled,
  Switch,
  Typography
} from '@material-ui/core'

import { withSharedTheme } from '../shared-theme/withSharedTheme'
import { parseAmount } from '../util/currencyFormatting'

import { PageHistory } from './pageHistory'

export interface PageTotal {
  total: Amount
  streamingTimeTotalSeconds: number
  favIcon?: string

  // favicon derived from this.key.url
  key: {
    origin: string
    url: string
    paymentPointer: string
  }
}

function makeKey(url: string, paymentPointer: string): PageTotal['key'] {
  return {
    url,
    paymentPointer,
    origin: new URL(url).origin
  }
}

const totals: Array<PageTotal> = [
  {
    streamingTimeTotalSeconds: 20932,
    total: parseAmount('$2.05'),
    key: makeKey(
      'https://sharafian.me/real-boy.html',
      '$twitter.xrptipbot.com/sharafian_'
    )
  },
  {
    streamingTimeTotalSeconds: 5647,
    total: parseAmount('$0.65'),
    key: makeKey(
      'https://sharafian.me/resume.html',
      '$twitter.xrptipbot.com/sharafian_'
    )
  },
  {
    streamingTimeTotalSeconds: 3449,
    favIcon: 'https://cdn.coil.com/assets/favicon.png',
    total: parseAmount('$0.42'),
    key: makeKey(
      'https://coil.com/p/WannaWanga/Kennedy-Family-Recipes/SlVNM7isL',
      '$spsp.coil.com/coil-content/creator'
    )
  },
  {
    streamingTimeTotalSeconds: 3012,
    favIcon: 'https://cdn.coil.com/assets/favicon.png',
    total: parseAmount('$0.36'),
    key: makeKey(
      'https://coil.com/p/Robert_Palmer/Darts-and-Laser-Focus/EOvsWVSAl',
      '$spsp.coil.com/coil-content/creator'
    )
  }
]

const MainPanel = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  width: '100%',
  maxWidth: '1032px',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(2),
  background: '#ffffff',
  borderRadius: '10px'
}))

const AdaptedLogos = styled(Grid)({
  padding: '8px 0 16px 16px',
  flex: '0 1 120px'
})

const TwitchLogo = styled('img')({
  height: '24px',
  position: 'relative',
  top: '11px',
  display: 'inline-flex'
})

const YoutubeLogo = styled('img')({
  height: '18px',
  position: 'relative',
  top: '13px',
  display: 'inline-flex'
})

const LogoCircle = styled('div')({
  background: '#fff',
  borderRadius: '2rem',
  boxShadow: '1px 1px 5px #c3d3d0',
  height: '44px',
  textAlign: 'center',
  width: '44px',
  marginRight: '8px'
})

const YoutubeTwitchCheckbox = styled(Grid)({
  margin: '10px 0 16px 0',
  '& img': {
    width: '24px',
    textAlign: 'left',
    paddingLeft: '5px'
  },
  '& label': {
    padding: '0 0 0 12px',
    margin: 0
  },
  '& span': {
    fontWeight: 400
  }
})

const OptionsRow = styled(Grid)({
  margin: '16px 0'
})

function Options() {
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [domain, setDomain] = useState('local')

  const handlePrivacyChange = () => {
    setPrivacyChecked(!privacyChecked)
  }

  const handleDomainChange = (event: any) => {
    setDomain(event.target.value)
  }

  const totalSeconds = totals.reduce(
    (acc, item) => acc + item.streamingTimeTotalSeconds,
    0
  )
  const label = 'Adapt non-monetized pages by sending URL anonymously'
  return (
    <Grid container justify='center' alignItems='center'>
      <MainPanel>
        <Grid item xs={12}>
          <Typography variant='h1' align='left'>
            Privacy
          </Typography>
          <Divider variant='middle' />
          <Grid container direction='column'>
            <Grid item xs={12}>
              <OptionsRow container justify='space-between' direction='row'>
                <Grid item xs={12} sm={10}>
                  <Grid container direction='row'>
                    <AdaptedLogos item xs>
                      <Grid container direction='row'>
                        <LogoCircle>
                          <YoutubeLogo
                            src='../../res/youtube.svg'
                            alt='YouTube'
                          />
                        </LogoCircle>
                        <LogoCircle>
                          <TwitchLogo src='../../res/twitch.svg' alt='Twitch' />
                        </LogoCircle>
                      </Grid>
                    </AdaptedLogos>
                    <YoutubeTwitchCheckbox item xs>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacyChecked}
                              onChange={handlePrivacyChange}
                              value='privacyChecked'
                              color='primary'
                            />
                          }
                          label={label}
                        />
                      </FormGroup>
                    </YoutubeTwitchCheckbox>
                  </Grid>
                </Grid>
              </OptionsRow>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h1' align='left'>
            History
          </Typography>
          <Divider variant='middle' />
          <PageHistory
            totalStreamingTimeSeconds={totalSeconds}
            totals={totals}
          />
        </Grid>
      </MainPanel>
    </Grid>
  )
}

const IndexWithRoot = withSharedTheme(Options)

function main() {
  const rootEl = document.getElementById('root')
  ReactDOM.render(<IndexWithRoot />, rootEl)
}

main()
