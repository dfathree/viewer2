import {
  FETCH_GENRE,
  genreLoaded,
} from '../modules/genre';

export function genreMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {

      if (action.type === FETCH_GENRE) {
        fetch('http://10.6.170.33:3000/api/genres')
        .then(res => res.json())
        .then(res => {
          dispatch(genreLoaded(res));
        })
      }

      return next(action);
    };
  };
}
