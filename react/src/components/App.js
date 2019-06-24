import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import GenreContainer from '../containers/GenreContainer';
import ThreContainer from '../containers/ThreContainer';
import RespContainer from '../containers/RespContainer';
import SpinnerContainer from '../containers/SpinnerContainer';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route path='/boards/:boardId/thres/:threId/resps' component={RespContainer} />
        <Route path='/boards/:boardId/thres' component={ThreContainer} />
        <Route path='/' component={GenreContainer} />
      </Switch>
    </HashRouter>
    <SpinnerContainer />
  </div>
)

export default App
