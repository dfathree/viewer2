import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Genre from '../components/Genre'
import Thre from '../components/Thre'
import Resp from '../components/Resp'
import Spinner from '../components/Spinner'

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route path="/boards/:boardId/thres/:threId/resps" component={Resp} />
        <Route path="/boards/:boardId/thres" component={Thre} />
        <Route path="/" component={Genre} />
      </Switch>
    </HashRouter>
    <Spinner />
  </div>
)

export default App
