import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';

export const FETCH_GENRE = 'FETCH_GENRE';
export const UPDATE_GENRE = 'UPDATE_GENRE';
const GENRE_LOADED = 'GENRE_LOADED';

// action creators
export const fetchGenre = () => (dispatch, getState) => {
  dispatch(showSpinner());
  fetch('http://10.6.170.33:3000/api/genres')
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    dispatch(genreLoaded(res));
  })
};

export const updateGenre = () => (dispatch, getState) => {
  dispatch(showSpinner());
  fetch('http://10.6.170.33:3000/api/genres/update')
  .then(res => res.json())
  .then(res => {
    dispatch(hideSpinner());
    if (res.result === 'OK') {
      dispatch(fetchGenre());
    }
  })
};

export const genreLoaded = data => ({
  type: GENRE_LOADED,
  data,
});

const initialState = {
  genre: [],
  board: [],
}

// reducer
export function genre(state = initialState, action) {
  if (action.type === FETCH_GENRE) {
    return { ...state };
  }
  if (action.type === GENRE_LOADED) {
    const boards = action.data.reduce((acc, cur) => [...acc, ...cur.boards], []);
    const boardNames = boards.map(b => b.ename).filter((x, i, self) => self.indexOf(x) === i);

    return {
      ...state,
      genre: action.data,
      board: boardNames.map(name => boards.find(b => b.ename === name))
    };
  }
  return state;
}
