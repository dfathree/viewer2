import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';

export const FETCH_THRE = 'FETCH_THRE';
const THRE_LOADED = 'THRE_LOADED';

// action creators
export const fetchThre = ({ boardId, cache = false }) => (dispatch, getState) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}/thres` + (cache ? '?cache=true' : '');

  dispatch(showSpinner());
  fetch(url)
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(threLoaded({
      boardId,
      thres: res,
    }));
  });
};

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
