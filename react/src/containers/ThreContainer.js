import { connect } from 'react-redux';
import { fetchThre } from '../modules/thre';
import Thre from '../components/Thre';


const mapStateToProps = ({ genre, thre }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId);
  return { board, thre };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThre: ({ boardId }) => {
      dispatch(fetchThre({ boardId }));
    },
  };
};

const ThreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Thre);

export default ThreContainer;
