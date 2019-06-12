export const FETCH_THRE = 'FETCH_THRE';
const THRE_LOADED = 'THRE_LOADED';

// action creators
export const fetchThre = boardId => ({
  type: FETCH_THRE,
  boardId,
});

export const threLoaded = data => ({
  type: THRE_LOADED,
  data,
});

const initialState = [];

// reducer
export function thre(state = initialState, action) {
  if (action.type === FETCH_THRE) {
    return [ ...state ];
  }
  if (action.type === THRE_LOADED) {
    return [ ...action.data ];
  }
  return state;
}
