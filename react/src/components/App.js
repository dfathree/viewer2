import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import GenreContainer from '../containers/GenreContainer';
import BoardContainer from '../containers/BoardContainer';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route path='/boards/:boardId/thres' component={BoardContainer} />
        <Route path='/' component={GenreContainer} />
      </Switch>
    </HashRouter>
  </div>
)

export default App
