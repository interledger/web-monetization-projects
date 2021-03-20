//! prototype use only

import React from 'react'
import { styled } from '@material-ui/core'

//
// Styles
//
const ComponentWrapper = styled('div')({
  paddingTop: '50px',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '1.5',
  '& h4': {
    marginBottom: '0px'
  }
})

//
// Component
//
export const Instructions = (): React.ReactElement => {
  return (
    <ComponentWrapper>
      <h1>Welcome to the Tipping UI Prototype</h1>
      <h4>Goal</h4>
      <p>
        The goal of this site is to test the UI/UX for proposed designs for
        tipping flow and mechanics. No real transactions are taking place and no
        data is being stored.
      </p>
      <p>
        Please note that the URL and extension are fake, they are there so you
        can initiate the test experience the same way you would initiate a tip
        on the real extension.
      </p>
      <h4>Summary</h4>
      <p>
        Please play with these UI’s and make notes of any good or bad
        experiences with the UI/UX and supply your feedback to the #p-tipping
        channel on Slack. That product channel will also be where we post
        notifcations for when new designs are ready to be tested. We would
        intentionally like to give you very little information about what else
        to do at this point or how to use the UI.
      </p>
      <br />
      <h4>Using the prototype</h4>
      <ol>
        <li>
          Click on the fake browser extension in the upper righthand corner of
          this page. This will open a pop up very similar to the way the real
          browser extension will.
        </li>
        <li>
          Enter your tip amount and complete the tip. This flow is what we are
          testing so it will be changing as we iterate designs.
        </li>
        <li>
          <strong>
            Change your fake user tip settings in the settings panel - repeat
            tip process to see how those changes effect your experience. To
            access the settings click on the menu icon in the upper lefthand
            corner
          </strong>
        </li>
        <li>Leave feedback in the #p-tipping channel on Slack</li>
      </ol>
    </ComponentWrapper>
  )
}
