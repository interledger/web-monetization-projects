import React from 'react'
import { Link } from 'react-router-dom'
import { useMonetizationState } from 'react-web-monetization'

const Hidden = () => {
  const { state } = useMonetizationState()

  return (
    <>
      <h1>React Web Monetization</h1>
      <Link to='/'>List</Link>

      <p>
        This is an example of how to show a special message to your
        web-monetized visitors. Keep in mind that it's enforced client-side.
        This means it's not suitable for serving premium content. It's great for
        thank-you messages or for hiding ads, though!
      </p>

      {state === 'stopped' && <b>Stopped.</b>}
      {state === 'pending' && <b>Loading...</b>}
      {state === 'started' && <b>Thank you for supporting our site!</b>}
      {!state && <b>[ Use Coil to support our site ]</b>}
    </>
  )
}

export default Hidden
