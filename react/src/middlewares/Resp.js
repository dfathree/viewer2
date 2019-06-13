import {
  FETCH_RESP,
  respLoaded,
} from '../modules/resp';

export function respMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_RESP) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/resps?x_no_cache=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(respLoaded(res));
        })
      }

      return next(action);
    };
  };
}
