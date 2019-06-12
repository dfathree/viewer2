import { connect } from 'react-redux';
import Genre from '../components/Genre';
import { fetchGenre } from '../modules/genre';

const mapStateToProps = ({ genre }) => {
  return genre;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenre: () => {
      dispatch(fetchGenre());
    },
  };
};

const GenreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Genre);

export default GenreContainer;
