import { connect } from 'react-redux';
import { fetchBookmark } from '../modules/thre';
import { fetchResp } from '../modules/resp';
import Resp from '../components/Resp';


const mapStateToProps = ({ genre, thre, resp }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId);
  const t = thre && thre.find(t => t.num === match.params.threId);

  return { board, thre: t, resp };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBookmark: ({ boardId, threId }) => {
      dispatch(fetchBookmark({ boardId, threId }));
    },
    fetchResp: ({ boardId, threId }) => {
      dispatch(fetchResp({ boardId, threId }));
    },
  };
};

const RespContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resp);

export default RespContainer;
