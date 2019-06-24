export const APPEND_RESP = 'APPEND_RESP';
export const FETCH_RESP_BY_BOOKMARK = 'FETCH_RESP_BY_BOOKMARK';
const RESP_LOADED = 'RESP_LOADED';
const APPEND_RESP_LOADED = 'APPEND_RESP_LOADED';

// action creators
export const appendResp = ({ boardId, threId, num = '1-1001' }) => ({
  type: APPEND_RESP,
  boardId,
  threId,
  num,
});

export const fetchRespByBookmark = ({ boardId, threId }) => ({
  type: FETCH_RESP_BY_BOOKMARK,
  boardId,
  threId,
});

export const respLoaded = data => ({
  type: RESP_LOADED,
  data,
});

export const appendRespLoaded = data => ({
  type: APPEND_RESP_LOADED,
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
  return state;
}
