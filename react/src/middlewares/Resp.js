import {
  APPEND_RESP,
  FETCH_RESP_BY_BOOKMARK,
  respLoaded,
  appendRespLoaded,
  SET_BOOKMARK,
  FETCH_BOOKMARK,
  bookmarkLoaded,
} from '../modules/resp';
import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';


export function respMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === APPEND_RESP) {
        const url = `http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/resps/${action.num}`;

        dispatch(showSpinner());
        fetch(url)
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(appendRespLoaded(res));
        })
      }

      if (action.type === FETCH_RESP_BY_BOOKMARK) {
        dispatch(showSpinner());
        fetch(`http://10.6.170.33:3000/api/boards/${action.boardId}/thres/${action.threId}/resps?bookmark=true`)
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(respLoaded(res));
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
