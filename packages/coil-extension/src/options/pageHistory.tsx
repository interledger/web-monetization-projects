import React from 'react'
import { Grid, Hidden, Typography } from '@material-ui/core'
import styled from 'styled-components'

import { formatAmount } from '../util/currencyFormatting'
import { Colors } from '../shared-theme/colors'
import { xsBreak } from '../shared-theme/theme'

import { PageTimeBar } from './pageTimeBar'
import { PageTotal } from './options'

const CenterElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  @media only screen and (min-width: ${xsBreak}) {
    justify: center;
    flex-direction: column;
  }
`

const PageHistoryH4 = styled(Typography)`
  && {
    margin: ${({ theme }) => theme.spacing(2)}px 0;
  }
`
// need && to set styles to override default mui styles
const Origin = styled(Typography)`
  && {
    display: inline-flex;
    font-size: 16px;
    margin: 8px 0;
    color: ${Colors.Grey800};
  }
`

const MobileHeading = styled(Typography)`
  && {
    margin: 12px 0 12px 0;
    display: inline-flex;
  }
`

const Favicon = styled.img`
  margin: 9px 8px 8px 0;
  width: 16px;
`

const Headings = styled.div`
  margin: 16px 24px;
`

const Row = styled.div`
  margin: 4px 8px 0;
  padding: 8px 16px;
  border-bottom: 2px solid ${Colors.Grey50};
  flex-direction: row;
`

const DomainRow = styled(Grid)`
  && {
    flex-direction: row;
    margin: 8px 0;
    ${Origin} {
      font-size: 20px;
      margin-top: 5px;
    }
    @media only screen and (min-width: ${xsBreak}) {
      margin: 0;
      ${Origin} {
        font-size: 16px;
        margin: 8px 0;
      }
    }
  }
`

const PageHistoryAmount = styled.div`
  border-radius: 20px;
  background: ${Colors.Grey900};
  color: ${Colors.White};
  font-size: 14px;
  padding: 2px 16px;
  margin: 2px 0 2px 0;
  display: inline-flex;
  justify-items: center;
  align-content: center;
`
export const PageHistory = (props: {
  totalStreamingTimeSeconds: number
  totals: Array<PageTotal>
}) => {
  return (
    <>
      <Hidden xsDown>
        <Headings>
          <Grid container>
            <Grid item sm={5}>
              <PageHistoryH4 variant='h4'>DOMAIN</PageHistoryH4>
            </Grid>
            <Grid item sm={4}>
              <PageHistoryH4 variant='h4'>TIME</PageHistoryH4>
            </Grid>
            <Grid item sm={3}>
              <Grid container justify='center'>
                <PageHistoryH4 variant='h4'>RECEIVED</PageHistoryH4>
              </Grid>
            </Grid>
          </Grid>
        </Headings>
      </Hidden>
      {props.totals.map((total: PageTotal, i: number) => {
        return (
          <Row key={`pageTotal-${i}`}>
            <Grid container direction='row'>
              {/*<Hidden smUp>*/}
              {/*  <Grid item xs={12}>*/}
              {/*    <MobileHeading variant='h4'>URL</MobileHeading>*/}
              {/*  </Grid>*/}
              {/*</Hidden>*/}
              <Grid item xs={12} sm={5}>
                <DomainRow container direction='row'>
                  <Grid item>
                    <Favicon
                      width='16'
                      src={
                        total.favIcon
                          ? total.favIcon
                          : '../../res/no-favicon.png'
                      }
                      alt={total.key.origin}
                    />
                  </Grid>
                  <Grid item>
                    <Origin variant='h4'>{total.key.origin}</Origin>
                  </Grid>
                </DomainRow>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  justify='center'
                  alignItems='center'
                  direction='row'
                >
                  <Hidden smUp>
                    <Grid item xs={6}>
                      <MobileHeading variant='h4'>TIME</MobileHeading>
                    </Grid>
                  </Hidden>
                  <Grid item xs={6} sm={12}>
                    <PageTimeBar
                      total={props.totalStreamingTimeSeconds}
                      fraction={total.streamingTimeTotalSeconds}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid
                  container
                  justify='center'
                  alignItems='center'
                  direction='row'
                >
                  <Hidden smUp>
                    <Grid item xs={6}>
                      <MobileHeading variant='h4'>RECEIVED</MobileHeading>
                    </Grid>
                  </Hidden>
                  <Grid item xs={6} sm={12}>
                    <CenterElement>
                      <PageHistoryAmount>
                        {formatAmount(total.total)}
                      </PageHistoryAmount>
                    </CenterElement>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Row>
        )
      })}
    </>
  )
}
