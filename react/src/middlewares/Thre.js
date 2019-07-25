import {
  FETCH_THRE,
  threLoaded,
} from '../modules/thre';
import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';


export function threMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_THRE) {
        const url = `http://10.6.170.33:3000/api/boards/${action.boardId}/thres` +
          (action.cache ? '?cache=true' : '');

        dispatch(showSpinner());
        fetch(url)
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(threLoaded({
            boardId: action.boardId,
            thres: res,
          }));
        })
      }

      return next(action);
    };
  };
}
