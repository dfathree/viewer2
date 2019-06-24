import {
  FETCH_THRE,
  FETCH_BOOKMARK,
  SET_BOOKMARK,
  threLoaded,
  bookmarkLoaded,
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

      if (action.type === FETCH_BOOKMARK) {
        dispatch(showSpinner());
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}`)
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(bookmarkLoaded(res));
        })
      }

      if (action.type === SET_BOOKMARK) {
        dispatch(showSpinner());
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/bookmark`, {
          method: 'POST',
          body: JSON.stringify({ bookmark: action.bookmark }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(bookmarkLoaded(res));
        })
      }

      return next(action);
    };
  };
}
