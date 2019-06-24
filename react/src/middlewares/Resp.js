import {
  FETCH_RESP,
  FETCH_RESP_BY_BOOKMARK,
  respLoaded,
} from '../modules/resp';

export function respMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_RESP) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/resps?cache=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(respLoaded(res));
        })
      }

      if (action.type === FETCH_RESP_BY_BOOKMARK) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/resps/?bookmark=true&cache=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(respLoaded(res));
        })
      }

      return next(action);
    };
  };
}
