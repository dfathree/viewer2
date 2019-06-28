import { connect } from 'react-redux';
import Genre from '../components/Genre';
import {
  fetchGenre,
  updateGenre,
} from '../modules/genre';

const mapStateToProps = ({ genre }) => {
  return genre;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenre: () => {
      dispatch(fetchGenre());
    },
    updateGenre: () => {
      dispatch(updateGenre());
    }
  };
};

const GenreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Genre);

export default GenreContainer;
