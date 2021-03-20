import React, { useEffect, useRef } from 'react'
import { styled } from '@material-ui/core'
import { Header, Footer } from '@coil/extension-popup/components'
import { getPageFaviconPath } from '@coil/extension-popup/utils/get-page-data.util'
import { Colors } from '@coil/extension-popup/theme'
import * as actions from '@coil/extension-popup/redux/actions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@coil/extension-popup/redux/models'
import MoneyRain from '@coil/extension-popup/assets/images/MoneyRain.gif'

//
// Styles
//
const ExtensionBodyWrapper = styled('div')(
  ({ random }: { random: number }) => ({
    padding: '24px 24px 16px 24px',
    minHeight: '352px', // based on the first views body height to keep consistent
    backgroundImage: `url("${MoneyRain}?${random}")`, //* the 'random' prop is needed so the gif animation replays every load
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // display: 'flex',
    // flexDirection: 'column',

    textAlign: 'center',
    color: Colors.Grey800,
    fontWeight: 'normal',
    '& > img': {
      width: '24px',
      height: '24px'
    }
  })
)

const Amount = styled('div')({
  height: '80px',
  marginTop: '46px',
  color: Colors.Grey800,
  textAlign: 'center',
  fontSize: '80px',
  fontWeight: 'bold',
  letterSpacing: '0px',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '63px'
})

//
// Component
//
export const CompleteView = (): React.ReactElement => {
  const { extensionIsOpen, currentTipAmount } = useSelector(
    (state: IRootState) => state,
    shallowEqual
  )
  const dispatch = useDispatch()
  const extensionIsOpenRef = useRef(extensionIsOpen)

  let closeTimeout: NodeJS.Timeout
  useEffect(() => {
    closeTimeout = setTimeout(handleClose, 4000)
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  useEffect(() => {
    // Ensure state propagates to event handler
    extensionIsOpenRef.current = extensionIsOpen
  }, [extensionIsOpen])

  const handleClose = () => {
    if (extensionIsOpenRef.current) dispatch(actions.toggle_extension())
  }

  return (
    <>
      <Header />
      <ExtensionBodyWrapper random={Math.random()}>
        <img src={getPageFaviconPath()} alt='site logo' />
        <div>Thanks for the donation!</div>
        <Amount>${currentTipAmount}</Amount>
      </ExtensionBodyWrapper>
      <Footer />
    </>
  )
}
