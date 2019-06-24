import { combineReducers } from 'redux';
import { genre } from '../modules/genre';
import { thre } from '../modules/thre';
import { resp } from '../modules/resp';
import { spinner } from '../modules/spinner';

export default combineReducers({
  genre,
  thre,
  resp,
  spinner,
})
