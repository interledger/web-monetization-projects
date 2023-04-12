import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Details from './Details'
import Hidden from './Hidden'
import List from './List'
import Conditional from './Conditional'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/details'>
        <Details />
      </Route>
      <Route path='/hidden'>
        <Hidden />
      </Route>
      <Route path='/conditional'>
        <Conditional />
      </Route>
      <Route>
        <List />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default App
