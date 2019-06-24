import { connect } from 'react-redux';
import { setBookmark } from '../modules/thre';
import { fetchRespByBookmark } from '../modules/resp';
import Resp from '../components/Resp';

const mapStateToProps = ({ genre, thre, resp }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId);
  const t = thre && thre.find(t => t.num === match.params.threId);

  return { board, thre: t, resp };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRespByBookmark: ({ boardId, threId }) => {
      dispatch(fetchRespByBookmark({ boardId, threId }));
    },
    setBookmark: ({ boardId, threId, bookmark }) => {
      dispatch(setBookmark({ boardId, threId, bookmark }));
    },
  };
};

const RespContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resp);

export default RespContainer;
