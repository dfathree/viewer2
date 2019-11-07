import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';

export const FETCH_ACCESS_HISTORIES = 'FETCH_ACCESS_HISTORIES';
const ACCESS_HISTORIES_LOADED = 'ACCESS_HISTORIES_LOADED';

// action creators
export const fetchAccessHistories = () => (dispatch, getState) => {
  dispatch(showSpinner());
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/access_histories`)
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(accessHistoriesLoaded(res));
  });
};

export const accessHistoriesLoaded = data => ({
  type: ACCESS_HISTORIES_LOADED,
  data,
});

const initialState = {
  accessHistories: [],
  isAccessHistoriesLoaded: false,
};

// reducer
export function accessHistories(state = initialState, action) {
  if (action.type === FETCH_ACCESS_HISTORIES) {
    return initialState;
  }
  if (action.type === ACCESS_HISTORIES_LOADED) {
    return {
      accessHistories: action.data,
      isAccessHistoriesLoaded: true,
    };
  }
  return state;
}
