export const FETCH_THRE = 'FETCH_THRE';
export const FETCH_BOOKMARK = 'FETCH_BOOKMARK';
const THRE_LOADED = 'THRE_LOADED';
const BOOKMARK_LOADED = 'BOOKMARK_LOADED';

// action creators
export const fetchThre = ({ boardId }) => ({
  type: FETCH_THRE,
  boardId,
});

export const fetchBookmark = ({ boardId, threId }) => ({
  type: FETCH_BOOKMARK,
  boardId,
  threId
});

export const threLoaded = data => ({
  type: THRE_LOADED,
  data,
});

export const bookmarkLoaded = data => ({
  type: BOOKMARK_LOADED,
  data,
});

const initialState = [];

// reducer
export function thre(state = initialState, action) {
  if (action.type === THRE_LOADED) {
    return [ ...action.data ];
  }
  if (action.type === BOOKMARK_LOADED) {
    return state.map(s => {
      if (s.num === action.data.thre_id) {
        return { ...s, bookmark: action.data.bookmark }
      }
      return s;
    })
  }
  return state;
}
