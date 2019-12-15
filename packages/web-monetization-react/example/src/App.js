import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Details from './Details'
import Hidden from './Hidden'
import List from './List'
import Conditional from './Conditional'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/details' component={Details} />
      <Route path='/hidden' component={Hidden} />
      <Route path='/conditional' component={Conditional} />
      <Route component={List} />
    </Switch>
  </BrowserRouter>
)

export default App
