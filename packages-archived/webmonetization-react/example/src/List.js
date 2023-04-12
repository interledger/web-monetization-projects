import React from 'react'
import { Link } from 'react-router-dom'

const List = () => (
  <>
    <h1>React Web Monetization</h1>
    <ul>
      <li>
        <Link to='/details'>Show hook details</Link>
      </li>
      <li>
        <Link to='/hidden'>Hidden message for Web-Monetized users</Link>
      </li>
      <li>
        <Link to='/conditional'>Conditional Web-Monetization components</Link>
      </li>
    </ul>
  </>
)

export default List
