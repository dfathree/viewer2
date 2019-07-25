import { connect } from 'react-redux';
import { fetchGenre } from '../modules/genre';
import { fetchThre } from '../modules/thre';
import {
  appendResp,
  fetchRespByBookmark,
  setBookmark,
} from '../modules/resp';
import Resp from '../components/Resp';

const mapStateToProps = ({ genre, thre, resp }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId) || { ename : match.params.boardId };
  const t = (thre && thre.thres.find(t => t.num === match.params.threId)) || { num: match.params.threId };

  return { board, thre: t, resp };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: ({ boardId }) => {
      dispatch(fetchGenre());
    },
    fetchThre: ({ boardId }) => {
      dispatch(fetchThre({ boardId, cache: true }));
    },
    appendResp: ({ boardId, threId, num }) => {
      dispatch(appendResp({ boardId, threId, num }));
    },
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
