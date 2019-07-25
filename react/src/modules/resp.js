import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';

export const APPEND_RESP = 'APPEND_RESP';
export const FETCH_RESP_BY_BOOKMARK = 'FETCH_RESP_BY_BOOKMARK';
const RESP_LOADED = 'RESP_LOADED';
const APPEND_RESP_LOADED = 'APPEND_RESP_LOADED';
export const SET_BOOKMARK = 'SET_BOOKMARK';
export const FETCH_BOOKMARK = 'FETCH_BOOKMARK';
const BOOKMARK_LOADED = 'BOOKMARK_LOADED';

// action creators
export const appendResp = ({ boardId, threId, num = '1-1001' }) => (dispatch, getState) => {
  const url = `http://10.6.170.33:3000/api/boards/${boardId}/thres/${threId}/resps/${num}`;
  dispatch(showSpinner());
  fetch(url)
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(appendRespLoaded(res));
  })
};

export const fetchRespByBookmark = ({ boardId, threId }) => (dispatch, getState) => {
  const url = `http://10.6.170.33:3000/api/boards/${boardId}/thres/${threId}/resps?bookmark=true`;
  dispatch(showSpinner());
  fetch(url)
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(respLoaded(res));
  })
};

export const respLoaded = data => ({
  type: RESP_LOADED,
  data,
});

export const appendRespLoaded = data => ({
  type: APPEND_RESP_LOADED,
  data,
});

export const setBookmark = ({ boardId, threId, bookmark }) => (dispatch, getState) => {
  const url = `http://10.6.170.33:3000/api/boards/${boardId}/thres/${threId}/bookmark`;
  dispatch(showSpinner());
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ bookmark }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(bookmarkLoaded(res));
  })
};

export const fetchBookmark = ({ boardId, threId }) => (dispatch, getState) => {
  const url = `http://10.6.170.33:3000/api/boards/${boardId}/thres/${threId}`;
  dispatch(showSpinner());
  fetch(url)
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(bookmarkLoaded(res));
  })
};

export const bookmarkLoaded = data => ({
  type: BOOKMARK_LOADED,
  data,
});

const initialState = {
  resps: [],
  bookarmk: 0,
};

// reducer
export function resp(state = initialState, action) {
  if (action.type === RESP_LOADED) {
    return { ...action.data };
  }
  if (action.type === APPEND_RESP_LOADED) {
    return {
      resps: [ ...state.resps, ...action.data.resps ],
      bookmark: action.data.bookmark,
      total: action.data.total,
    };
  }
  if (action.type === BOOKMARK_LOADED) {
    return {
      ...state,
      bookmark: action.data.bookmark,
    };
  }
  return state;
}
