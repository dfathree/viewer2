export const FETCH_GENRE = 'FETCH_GENRE';
export const UPDATE_GENRE = 'UPDATE_GENRE';
const GENRE_LOADED = 'GENRE_LOADED';
export const GENRE_UPDATED = 'GENRE_UPDATED';

// action creators
export const fetchGenre = () => ({
  type: FETCH_GENRE
});

export const updateGenre = () => ({
  type: UPDATE_GENRE
});

export const genreLoaded = data => ({
  type: GENRE_LOADED,
  data,
});

export const genreUpdated = data => ({
  type: GENRE_UPDATED,
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
