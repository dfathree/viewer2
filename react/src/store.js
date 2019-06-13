import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { genreMiddleware } from './middlewares/Genre';
import { threMiddleware } from './middlewares/Thre';
import { respMiddleware } from './middlewares/Resp';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(
    genreMiddleware,
    threMiddleware,
    respMiddleware,
  ))
);

export default store;
