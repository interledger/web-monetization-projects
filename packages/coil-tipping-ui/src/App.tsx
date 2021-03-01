import React, { FormEvent, useState } from 'react'

import logo from './logo.svg'
import './App.css'

import { GraphQlClient } from '@coil/client'

const client = new GraphQlClient()

function SendTip() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [pp, setPP] = useState('$twitter.xrptipbot.com/Coil')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('SUBMITTED', user, pass)
    const token = await client.login(user, pass)
    console.log('logged in', token)
    const result = await client.query({
      query: `
          mutation sendTip($receiver: String!) {
            sendTip(receiver: $receiver) {
              success
            }
          }
        `,
      token,
      variables: {
        receiver: pp
      }
    })
    console.log(result)
  }

  return (
    <form onSubmit={submit}>
      <input
        style={{ width: '200px' }}
        placeholder='payment pointer'
        onChange={e => setPP(e.target.value)}
        value={pp}
        name='pp'
      />
      <br />
      <input
        placeholder='email'
        onChange={e => setUser(e.target.value)}
        value={user}
        name='username'
      />
      <br />
      <input
        placeholder='password'
        onChange={e => setPass(e.target.value)}
        value={pass}
        type='password'
        name='password'
      />
      <br />
      <input type='submit' value='Send Tip' />
    </form>
  )
}

function HotReloaded() {
  const [num, setNum] = useState(5)
  const onClick = () => setNum(p => p + 1)
  return <pre onClick={onClick}>Mambo numbero gina: {num} !</pre>
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload
        </p>
        <SendTip></SendTip>
        <HotReloaded></HotReloaded>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export { App }
