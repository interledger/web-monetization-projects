/*
    TipCompleteView

    responsible for rendering the final tip view for users to see how much they just tipped as well as be presented with the 'undo' option.
*/

import React, { useEffect } from 'react'
import { styled, Box, Button, makeStyles } from '@material-ui/core'
import { Colors } from '../../../shared-theme/colors'
import { TipProcessStep, ITipView } from './TipRouter'
import { TipPaymentDebits } from '../TipPaymentDebits'

//
// Styles
//
const OuterDiv = styled('div')({
  minWidth: '308px',
  maxWidth: '308px',
  height: 'auto',
  minHeight: '260px'
})

const ExtensionBodyWrapper = styled('div')(({ random }: { random: number }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 24px 0px 24px',
  minHeight: '455px', // based on the first views body height to keep consistent
  backgroundImage: `url("/res/MoneyRain.gif?${random}")`, //* the 'random' prop is needed so the gif animation replays every load
  backgroundSize: '110% 110%',
  backgroundRepeat: 'no-repeat',
  textAlign: 'center',
  color: Colors.Grey800,
  fontWeight: 'normal',
  '& > img': {
    width: '24px',
    height: '24px'
  }
}))

const Amount = styled('div')({
  height: '80px',
  color: Colors.Grey800,
  textAlign: 'center',
  fontSize: '80px',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 'bold',
  letterSpacing: '0px',
  lineHeight: '80px'
})


const ProgressBar = styled('div')({
  position: 'relative',
  width: '100%',
  height: '4px',
  backgroundColor: Colors.Grey800,
})

const Fill = styled('div')({
  position: 'absolute',
  zIndex: 8,
  width: '100%',
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: Colors.Grey100,
})

//* cannot get the keyframes to work with 'styled' syntax
const useStyles = makeStyles({
  fill: {
    animation: `$fill 5s linear`
  },
  '@keyframes fill': {
    from: { width: '0%' },
    to: { width: '100%' }
  }
})


//
// Component
//
export const TipCompleteView = (props: Omit<ITipView, 'context' | 'setCurrentTipAmount'>): React.ReactElement => {
    const { currentTipAmount, setTipProcessStep } = props
    const classes = useStyles()

    const tipCreditBalance = 10 //! needs to be replaced with data from an api call to users settings

    let closeTimeout: NodeJS.Timeout
    useEffect(() => {
        closeTimeout = setTimeout(handleClose, 5000)
        return () => {
        clearTimeout(closeTimeout)
        }
    }, [])

    const handleClose = () => {
        window.close()
    }

    const handleUndo = () => {
        // clear timeout
        clearTimeout(closeTimeout)
        
        // undo last tip

        // reset to tip view
        setTipProcessStep(TipProcessStep.TIP)
    }

    return (
        <OuterDiv>
          <ExtensionBodyWrapper random={Math.random()}>
              <Box fontSize='18px'>
                  Thanks for the donation!
              </Box>
              <Box my='30px'>
                  <Amount>${currentTipAmount}</Amount>
              </Box>
              <Box>
                  <TipPaymentDebits currentTipAmount={currentTipAmount}/>
              </Box>
              
              <Box mx='-24px' flex='1' display='flex' flexDirection='column' justifyContent='flex-end'>
                  <Box mb='5px'>
                      <Button onClick={handleUndo}>Undo</Button>
                  </Box>
                  <ProgressBar>
                      <Fill className={classes.fill}/>
                  </ProgressBar>
              </Box>
          </ExtensionBodyWrapper>
        </OuterDiv>
    )
}
