export const FETCH_RESP = 'FETCH_RESP';
const RESP_LOADED = 'RESP_LOADED';

// action creators
export const fetchResp = ({ boardId, threId }) => ({
  type: FETCH_RESP,
  boardId,
  threId,
});

export const respLoaded = data => ({
  type: RESP_LOADED,
  data,
});

const initialState = [];

// reducer
export function resp(state = initialState, action) {
  if (action.type === FETCH_RESP) {
    return [ ...state ];
  }
  if (action.type === RESP_LOADED) {
    return [ ...action.data ];
  }
  return state;
}
