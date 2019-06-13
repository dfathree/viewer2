import {
  FETCH_THRE,
  FETCH_BOOKMARK,
  threLoaded,
  bookmarkLoaded,
} from '../modules/thre';

export function threMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_THRE) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres?x_no_cache=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(threLoaded(res));
        })
      }

      if (action.type === FETCH_BOOKMARK) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}`)
        .then(res => res.json())
        .then(res => {
          dispatch(bookmarkLoaded(res));
        })
      }

      return next(action);
    };
  };
}
