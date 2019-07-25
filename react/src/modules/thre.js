export const FETCH_THRE = 'FETCH_THRE';
const THRE_LOADED = 'THRE_LOADED';

// action creators
export const fetchThre = ({ boardId, cache = false }) => ({
  type: FETCH_THRE,
  boardId,
  cache,
});

export const threLoaded = data => ({
  type: THRE_LOADED,
  data,
});

const initialState = {
  boardId: null,
  thres: [],
};

// reducer
export function thre(state = initialState, action) {
  if (action.type === THRE_LOADED) {
    return {
      ...state,
      boardId: action.data.boardId,
      thres: [ ...action.data.thres ],
    };
  }
  return state;
}
