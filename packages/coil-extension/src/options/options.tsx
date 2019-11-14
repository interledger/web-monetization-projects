import '@abraham/reflection'

import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Amount } from '@web-monetization/types'
import styled from 'styled-components'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
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

const MainPanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  width: 100%;
  max-width: 1032px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  background: #ffffff;
  border-radius: 10px;
`
const AdaptedLogos = styled.div`
  padding: 8px 0 0 0;
`
const TwitchLogo = styled.img`
  height: 20px;
  position: relative;
  top: 4px;
  display: inline-flex;
`
const YoutubeTwitchCheckbox = styled(Grid)`
  && {
    margin: 16px 0;
    img {
      width: 24px;
      text-align: left;
      padding-left: 5px;
    }
    label {
      padding: 0 0 0 12px;
      margin: 0;
    }
    span {
      font-weight: 400;
    }
  }
`

function Options() {
  const [privacyChecked, setPrivacyChecked] = useState(false)

  const handlePrivacyChange = () => {
    setPrivacyChecked(!privacyChecked)
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
              <YoutubeTwitchCheckbox>
                <FormGroup row>
                  {/*<AdaptedLogos>*/}
                  {/*  <img src='../../res/youtube.svg' alt='YouTube'/>*/}
                  {/*  <TwitchLogo src='../../res/twitch.svg' alt='Twitch'/>*/}
                  {/*</AdaptedLogos>*/}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={privacyChecked}
                        onChange={handlePrivacyChange}
                        value='privacyChecked'
                      />
                    }
                    label={label}
                  />
                </FormGroup>
              </YoutubeTwitchCheckbox>
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
