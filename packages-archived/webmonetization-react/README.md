# Web Monetization React

> React module that lets you access the state of Web Monetization

## Credits

Written by [Ben Sharafian](https://github.com/sharafian) and inlined from
https://github.com/sharafian/react-web-monetization

## Examples

This repo contains several usage examples in `example/`. To host the site and
view the examples, run:

```
cd example
npm install
npm start
```

Then go to `http://localhost:3000`.

## Usage

### Enabling Web Monetization

You will still need to insert the Web Monetization meta tag into your
document's `<head>`. This should be done in the HTML file that react renders
into, not in React.

For a specification of this meta tag, see [Interledger RFC
0028](https://github.com/interledger/rfcs/blob/master/0028-web-monetization/0028-web-monetization.md)

### Web Monetization State Hook

This hook will update when the first web-monetization micropayment occurs on the page and the state goes from `pending` to `started`.

```jsx
import React from 'react'
import { useMonetizationState } from 'react-web-monetization'

const MyMessage = props => {
  const monetization = useMonetizationState()

  return (
    <p>
      {monetization.state === 'stopped' && 'Stopped'}
      {monetization.state === 'pending' && 'Loading...'}
      {monetization.state === 'started' && 'Thanks for supporting our site!'}
      {!monetization.state && 'Sign up for Coil to support our site!'}
    </p>
  )
}

export default MyMessage
```

### Web Monetization Counter Hook

This hook will update on each web-monetization micropayment that occurs. It
tracks a running total for how much has been paid out to the page.

You should only use this hook if you're updating on every micropayment. If you
only need a boolean on whether or not payment is happening, use
[useMonetizationState](#web-monetization-state-hook)

```jsx
import React from 'react'
import { useMonetizationCounter } from 'react-web-monetization'

const MyCounter = props => {
  const monetization = useMonetizationCounter()

  return (
    <p>
      {(monetization.totalAmount / 10 ** monetization.assetScale).toFixed(monetization.assetScale)}
      {monetization.assetCode}
    </p>
  )
}

export default MyCounter
```

### Web Monetization Conditional Components

Web Monetization Conditional Components allow you to wrap react components so
that they display if Web Monetization is enabled/disabled/pending.

They're intended for simple situations where you don't want to write the same
code using hooks over and over. Their functionality can easily be replicated by
using the [Web Monetization State](#web-monetization-state) hook.

[See an example of their usage here.](example/src/Conditional.js)

```jsx
import React from 'react'
import { IfWebMonetized } from 'react-web-monetization'

const MyMessage = props => {
  return (
    <IfWebMonetized>
      <p>Thanks for supporting me!</p>
    </IfWebMonetized>
  )
}
```

```jsx
import React from 'react'
import { IfNotWebMonetized } from 'react-web-monetization'

const MyMessage = props => {
  return (
    <IfNotWebMonetized>
      <p>Please support me with Web Monetization!</p>
    </IfNotWebMonetized>
  )
}
```

### Init Global Web Monetization State

Sometimes you don't load in any monetization hooks at page load, but you want
to start listening for web monetization events anyways. You can use the
`initGlobalWebMonetizationState` function to force the module to start
listening for global web monetization events.

```jsx
import React from 'react'
import { initGlobalWebMonetizationState } from 'react-web-monetization'

initGlobalWebMonetizationState()
```
