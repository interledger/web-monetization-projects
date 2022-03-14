import React from 'react'
import { styled, Box } from '@material-ui/core'

import { Header } from '../Header'
import { NavBar } from '../NavBar'
import { Colors } from '../../../shared-theme/colors'
import { FitTextWrapper } from '../FitTextWrapper'
import { RandomThankYouMessage } from '../RandomThankYouMessage'
import { useTip } from '../../context/tipContext'
import { AnimateTippingHeaderWrapper } from '../page-animation-wrappers/AnimateTippingHeaderWrapper'
import { AnimateTipCompleteViewMessageWrapper } from '../page-animation-wrappers/AnimateTipCompleteViewMessageWrapper'
import { AnimateTippingNavBarWrapper } from '../page-animation-wrappers/AnimateTippingNavBarWrapper'

//
// Styles
//

const BodyWrapper = styled('div')(({ url }: { url: string }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: `url("${url}")`, //* the 'random' prop is needed so the gif animation replays every load
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom',
  textAlign: 'center',
  color: Colors.Grey800,
  fontWeight: 'normal',
  '& > img': {
    width: '24px',
    height: '24px'
  }
}))

//
// Component
//
export const TipCompleteView = (): React.ReactElement => {
  const { finalTipAmountUsd } = useTip()

  const getBackgroundImageUrl = () => {
    let ImgUrl = '/res/Level1.gif'
    if (finalTipAmountUsd >= 5 && finalTipAmountUsd <= 20) {
      ImgUrl = '/res/Level2.gif'
    }
    if (finalTipAmountUsd > 20 && finalTipAmountUsd <= 50) {
      ImgUrl = '/res/Level3.gif'
    }
    if (finalTipAmountUsd > 50) {
      ImgUrl = '/res/Level4.gif'
    }
    // adding a random number to the url allows it re-render the animation on the same page
    // but it is re-rendering the animation every time there is a stream transaction

    // return `${ImgUrl}?${Math.random()}`
    return `${ImgUrl}`
  }

  return (
    <>
      <BodyWrapper url={getBackgroundImageUrl()}>
        <AnimateTippingHeaderWrapper>
          <Header />
        </AnimateTippingHeaderWrapper>
        <Box mt={5} mb={2} px={3}>
          <FitTextWrapper defaultFontSize={80}>
            $
            {Number.isInteger(finalTipAmountUsd)
              ? finalTipAmountUsd
              : finalTipAmountUsd.toFixed(2)}
          </FitTextWrapper>
        </Box>
        <Box px={3}>
          <AnimateTipCompleteViewMessageWrapper>
            <RandomThankYouMessage />
          </AnimateTipCompleteViewMessageWrapper>
        </Box>
      </BodyWrapper>
      <AnimateTippingNavBarWrapper>
        <NavBar />
      </AnimateTippingNavBarWrapper>
    </>
  )
}
