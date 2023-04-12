import React from 'react'
import { Link } from 'react-router-dom'
import {
  IfNotWebMonetized,
  IfWebMonetizationPending,
  IfWebMonetized
} from 'react-web-monetization'

const Conditional = () => (
  <>
    <h1>React Web Monetization</h1>
    <Link to='/'>List</Link>

    <p>
      This is an example of the conditional Web Monetization components, which
      display their contents conditional on whether Web Monetization is enabled.
    </p>

    <p>
      It's enforced client-side so it's not secure for premium content, but it's
      fine for playing around with or for client side features like styling,
      thank-you messages, or hidden ads.
    </p>

    <p>The message below will display if Web Monetization is on</p>

    <IfWebMonetized>
      <p>
        <strong>Web Monetization is on!</strong>
      </p>
    </IfWebMonetized>

    <p>The message below will display if Web Monetization is off</p>

    <IfNotWebMonetized>
      <p>
        <strong>Web Monetization is off!</strong>
      </p>
    </IfNotWebMonetized>

    <p>
      The message below will display if Web Monetization is on OR enabled but
      pending. This will be faster to render than the first message, but it
      might still display if Web Monetization doesn't work due to a server
      error.
    </p>

    <IfWebMonetized showOnPending>
      <p>
        <strong>Web Monetization is on!</strong>
      </p>
    </IfWebMonetized>

    <p>
      The message below will display if Web Monetization is pending. Once it is
      started, it will go away. It also won't show if Web Monetization is not
      enabled at all
    </p>

    <IfWebMonetizationPending>
      <p>
        <strong>Web Monetization is pending!</strong>
      </p>
    </IfWebMonetizationPending>
  </>
)

export default Conditional
