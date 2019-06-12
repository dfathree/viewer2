import {
  FETCH_THRE,
  threLoaded,
} from '../modules/thre';

export function threMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_THRE) {
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres?no_cache=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(threLoaded(res));
        })
      }

      return next(action);
    };
  };
}
