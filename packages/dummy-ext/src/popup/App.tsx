import React, { useState } from 'react'

import reactLogo from '../assets/react.svg'

// This is just to check if the tsconfig is being picked up properly and
// the paths are honored! They seem to be automagically, which is nice.
// 3 cheers for the vite!
import { getSPSPResponse } from '@webmonetization/polyfill-utils'

import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count} {getSPSPResponse.toString()}
        </button>
        <p>
          Edit <code>src/popup/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
