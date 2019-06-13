import { combineReducers } from 'redux';
import { genre } from '../modules/genre';
import { thre } from '../modules/thre';
import { resp } from '../modules/resp';

export default combineReducers({
  genre,
  thre,
  resp,
})
