import { connect } from 'react-redux';
import { fetchThre } from '../modules/thre';
import Board from '../components/Board';


const mapStateToProps = ({ genre, thre }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId);
  return { board, thre };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThre: boardId => {
      dispatch(fetchThre(boardId));
    },
  };
};

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
