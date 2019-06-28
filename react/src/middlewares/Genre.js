import {
  FETCH_GENRE,
  UPDATE_GENRE,
  GENRE_UPDATED,
  fetchGenre,
  genreLoaded,
  genreUpdated,
} from '../modules/genre';
import {
  showSpinner,
  hideSpinner,
} from '../modules/spinner';

export function genreMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_GENRE) {
        dispatch(showSpinner());
        fetch('http://10.6.170.33:3000/api/genres')
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          dispatch(genreLoaded(res));
        })
      }

      if (action.type === UPDATE_GENRE) {
        dispatch(showSpinner());
        fetch('http://10.6.170.33:3000/api/genres/update')
        .then(res => res.json())
        .then(res => {
          dispatch(hideSpinner());
          if (res.result === 'OK') {
            dispatch(genreUpdated());
          }
        })
      }

      if (action.type === GENRE_UPDATED) {
        dispatch(fetchGenre());
      }

      return next(action);
    };
  };
}
