export const FETCH_RESP = 'FETCH_RESP';
export const FETCH_RESP_BY_BOOKMARK = 'FETCH_RESP_BY_BOOKMARK';
const RESP_LOADED = 'RESP_LOADED';

// action creators
export const fetchResp = ({ boardId, threId }) => ({
  type: FETCH_RESP,
  boardId,
  threId,
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

const initialState = {
  resps: [],
  bookarmk: 0,
};

// reducer
export function resp(state = initialState, action) {
  if (action.type === RESP_LOADED) {
    return { ...action.data };
  }
  return state;
}
