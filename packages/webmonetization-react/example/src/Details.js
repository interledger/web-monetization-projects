import React from 'react'
import { Link } from 'react-router-dom'
import {
  useMonetizationCounter,
  useMonetizationState
} from 'react-web-monetization'

const ObjectTable = ({ obj }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(obj).map(key => (
        <tr>
          <td>{key}</td>
          <td>{String(obj[key])}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const Details = () => {
  const monetizationDetails = useMonetizationCounter()
  const monetizationState = useMonetizationState()

  return (
    <>
      <h1>React Web Monetization</h1>
      <Link to='/'>List</Link>

      <h2>Web Monetization State</h2>
      <ObjectTable obj={monetizationState} />

      <h2>Web Monetization Counter</h2>
      <ObjectTable obj={monetizationDetails} />
    </>
  )
}

export default Details
