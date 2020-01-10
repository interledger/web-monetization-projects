import React, { useEffect, useState } from 'react'
import { Tooltip, withStyles, styled } from '@material-ui/core'

import { PopupProps } from '../types'
import { Colors } from '../../shared-theme/colors'
import { SetStreamControls, ToPopupMessage } from '../../types/commands'
import {
  PlayOrPauseState,
  StickyState,
  ToggleControlsAction
} from '../../types/streamControls'

const ControlBar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 0,
  height: 'auto',
  width: '100%'
})

const buttonTransition = 'all 0.2s ease-in-out'
const buttonScale = 'scale(0.94)'
const baseIconFillColor = '#50555d'
const playStickyFillColor = '#40C28D'
const playStickyDisabledFillColor = Colors.Grey550
const pauseFillColor = Colors.Grey550

const controlStyles = {
  padding: '5px',
  height: '44px',
  display: 'block',
  transition: buttonTransition,
  '&:hover': {
    transform: buttonScale
  }
}

const PlayOrPause = styled('a')({
  ...controlStyles,
  '&.paused .pauseSvg': {
    fill: pauseFillColor
  },
  '&.playing .playSvg': {
    fill: playStickyFillColor
  }
})

const Sticky = styled('a')({
  ...controlStyles,
  '&.auto .playStickySvg': {
    fill: playStickyDisabledFillColor
  },
  '&.sticky .playStickySvg': {
    fill: playStickyFillColor
  }
})

const ControlsTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: Colors.Grey700,
    boxShadow: theme.shadows[0],
    fontFamily: 'CircularStd',
    border: `1px solid ${Colors.Grey89}`,
    fontWeight: 500,
    fontSize: 11,
    padding: '10px',
    borderRadius: 0
  }
}))(Tooltip)

const PlayIconSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34.388'
      height='34.388'
      viewBox='0 0 34.388 34.388'
    >
      <path
        id='play_circle_outline'
        className='playSvg'
        d='M19.21,33.015a13.8,13.8,0,1,0-13.8-13.8A13.851,13.851,0,0,0,19.21,33.015Zm0-31A17.194,17.194,0,1,1,2.016,19.21,17.157,17.157,0,0,1,19.21,2.016ZM15.738,26.96V11.46l10.333,7.75Z'
        transform='translate(-2.016 -2.016)'
        fill={baseIconFillColor}
      />
    </svg>
  )
}

const Messages = {
  WILL_STREAM_BACKGROUNDED: 'Keep streaming when in background',
  WILL_PAUSE_STREAM_BACKGROUNDED: 'Pause streaming when in background',
  WILL_PAUSE: 'Pause streaming',
  WILL_RESUME: 'Resume streaming'
}

const StickyPlayIconSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34.388'
      height='34.388'
      viewBox='0 0 34.388 34.388'
    >
      <g id='Group_40' transform='translate(-1093.483 -302)'>
        <path
          className='playStickySvg'
          d='M5.855,17.988V12.167H8.726L4.417,7.135l-4.4,5.033H2.9v8.686H15.654l-2.864-2.865H5.855Zm14.62-2.214V7.043H7.675l2.91,2.91h6.934v5.822H14.648l4.309,5.033,4.4-5.033H20.476Z'
          transform='translate(1098.466 304.957)'
          fill={baseIconFillColor}
        />
        <g id='Group_39' transform='translate(105.483 -166.159)'>
          <g id='Group_27' transform='translate(965 468.159)'>
            <path
              className='playStickySvg'
              fill={baseIconFillColor}
              d='M19.21,33.015a13.8,13.8,0,1,0-13.8-13.8A13.851,13.851,0,0,0,19.21,33.015Zm0-31A17.194,17.194,0,1,1,2.016,19.21,17.157,17.157,0,0,1,19.21,2.016Z'
              transform='translate(20.984 -2.016)'
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

const PauseIconSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34.39'
      height='34.39'
      viewBox='0 0 34.39 34.39'
      preserveAspectRatio='xMidYMid meet'
    >
      <path
        className='pauseSvg'
        d='M20.906,26.072V12.348h3.472V26.072Zm-1.695,6.944A13.806,13.806,0,1,0,5.405,19.211,13.851,13.851,0,0,0,19.211,33.017Zm0-31a17.2,17.2,0,1,1-17.195,17.2,17.158,17.158,0,0,1,17.195-17.2ZM14.044,26.072V12.348h3.472V26.072Z'
        transform='translate(-2.016 -2.016)'
        fill={baseIconFillColor}
      />
    </svg>
  )
}

interface SetStreamControlsParams {
  sticky: StickyState
  play: PlayOrPauseState
  action: ToggleControlsAction
}

export const StreamControls = (props: PopupProps) => {
  const [stickyState, setStickyState] = useState<StickyState>(
    props.context.store.stickyState || 'auto'
  )
  const [playOrPauseState, setPlayOrPauseState] = useState<PlayOrPauseState>(
    props.context.store.playState || 'playing'
  )

  const setStreamControls = (data: SetStreamControlsParams) => {
    const message: SetStreamControls = {
      command: 'setStreamControls',
      data
    }
    props.context.runtime.sendMessage(message)
  }

  useEffect(() => {
    const listener = (message: ToPopupMessage) => {
      if (message.command === 'localStorageUpdate') {
        if (message.key === 'stickyState') {
          const sticky = props.context.store.stickyState
          // TODO: document why have and why need to ignore null changes
          sticky != null && setStickyState(sticky)
        } else if (message.key === 'playState') {
          const play = props.context.store.playState
          play != null && setPlayOrPauseState(play)
        }
      }
    }
    props.context.runtime.onMessageAddListener(listener)
    return () => props.context.runtime.onMessageRemoveListener(listener)
  }, [])

  const stickyTooltip =
    stickyState === 'sticky'
      ? Messages.WILL_PAUSE_STREAM_BACKGROUNDED
      : Messages.WILL_STREAM_BACKGROUNDED

  const playOrPauseTooltip =
    playOrPauseState === 'playing' ? Messages.WILL_PAUSE : Messages.WILL_RESUME

  const [hoveringPlayOrPause, setHoveringOnPlayOrPause] = useState(false)
  const [hoveringSticky, setHoveringOnSticky] = useState(false)

  const toggleStickyState = () => {
    const sticky = stickyState === 'auto' ? 'sticky' : 'auto'
    setStickyState(sticky)
    setStreamControls({
      sticky: sticky,
      play: playOrPauseState,
      action: 'toggleSticky'
    })
  }

  const togglePlayOrPausedState = () => {
    const play = playOrPauseState === 'paused' ? 'playing' : 'paused'
    setPlayOrPauseState(play)
    setStreamControls({
      sticky: stickyState,
      play,
      action: 'togglePlayOrPause'
    })
  }

  const iconState =
    (playOrPauseState === 'playing' && !hoveringPlayOrPause) ||
    (playOrPauseState === 'paused' && hoveringPlayOrPause)
      ? 'playing'
      : 'paused'

  const stickyIconState =
    (stickyState === 'auto' && !hoveringSticky) ||
    (stickyState === 'sticky' && hoveringSticky)
      ? 'auto'
      : 'sticky'

  return (
    <ControlBar>
      <ControlsTooltip
        title={playOrPauseTooltip}
        aria-label='pause'
        placement='top'
      >
        <PlayOrPause
          onMouseLeave={() => setHoveringOnPlayOrPause(false)}
          onMouseEnter={() => setHoveringOnPlayOrPause(true)}
          onClick={togglePlayOrPausedState}
          className={iconState}
        >
          {iconState === 'playing' ? <PlayIconSvg /> : <PauseIconSvg />}
        </PlayOrPause>
      </ControlsTooltip>
      <ControlsTooltip title={stickyTooltip} aria-label='play' placement='top'>
        <Sticky
          onMouseLeave={() => setHoveringOnSticky(false)}
          onMouseEnter={() => setHoveringOnSticky(true)}
          onClick={toggleStickyState}
          className={stickyIconState}
        >
          <StickyPlayIconSvg />
        </Sticky>
      </ControlsTooltip>
    </ControlBar>
  )
}
