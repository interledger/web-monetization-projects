import React from 'react'
import { styled, Box } from '@material-ui/core'

import { NewHeaderFooterLayout } from '../NewHeaderFooterLayout'
import { Colors } from '../../../shared-theme/colors'
import { FitTextWrapper } from '../FitTextWrapper'
import { RandomThankYouMessage } from '../RandomThankYouMessage'
import { useTip } from '../../context/tipContext'

//
// Styles
//

const BodyWrapper = styled('div')(({ url }: { url: string }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 24px',
  backgroundImage: `url("${url}")`, //* the 'random' prop is needed so the gif animation replays every load
  backgroundSize: '105% 105%',
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
  const { currentTipAmount } = useTip()

  const getBackgroundImageUrl = () => {
    let ImgUrl = '/res/Level1.gif'
    if (currentTipAmount >= 5 && currentTipAmount <= 20) {
      ImgUrl = '/res/Level2.gif'
    }
    if (currentTipAmount > 20 && currentTipAmount <= 50) {
      ImgUrl = '/res/Level3.gif'
    }
    if (currentTipAmount > 50) {
      ImgUrl = '/res/Level4.gif'
    }
    // adding a random number to the url allows it re-render the animation on the same page
    // but it is re-rendering the animation every time there is a stream transaction

    // return `${ImgUrl}?${Math.random()}`
    return `${ImgUrl}`
  }

  return (
    <NewHeaderFooterLayout>
      <BodyWrapper url={getBackgroundImageUrl()}>
        <Box mt={5} mb={3}>
          <FitTextWrapper defaultFontSize={80}>
            $
            {Number.isInteger(currentTipAmount)
              ? currentTipAmount
              : currentTipAmount.toFixed(2)}
          </FitTextWrapper>
        </Box>
        <RandomThankYouMessage />
      </BodyWrapper>
    </NewHeaderFooterLayout>
  )
}
