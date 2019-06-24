import {
  FETCH_GENRE,
  genreLoaded,
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

      return next(action);
    };
  };
}
