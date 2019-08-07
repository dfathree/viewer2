import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import { fetchGenre } from '../../modules/genre';
import { fetchThre } from '../../modules/thre';
import styles from './styles.module.css';

class Thre extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      updated: false,
    };
  }

  componentDidMount() {
    this.setState({ updated: false });

    if (!this.props.board.jname) {
      this.props.fetchBoard({ boardId: this.props.board.ename });
    }

    // 最初にキャッシュを使用して素早く表示
    // その後、最新の状態に書き換える
    if (this.props.thre.thres.length === 0 ||
        this.props.thre.boardId !== this.props.board.ename) {
      this.props.fetchThre({
        boardId: this.props.board.ename,
        cache: true,
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.updated) {
      this.props.fetchThre({
        boardId: this.props.board.ename,
        cache: false,
      });
      this.setState({ updated: true });
    }
  }

  render() {
    const boardName = this.props.board.jname || '';
    return (
      <div>
        <Paper elevation={0} className={styles.breadcrumbs}>
          <Breadcrumbs>
            <Link to="/">トップ</Link>
            <div>{boardName}</div>
          </Breadcrumbs>
        </Paper>
        <div>
          {this.props.thre.thres.map(thre =>
            <div key={thre.num}>
              <Link to={`/boards/${this.props.board.ename}/thres/${thre.num}/resps`}>
                {thre.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ genre, thre }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId) || { ename: match.params.boardId };
  return { board, thre };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: ({ boardId }) => {
      dispatch(fetchGenre());
    },
    fetchThre: ({ boardId, cache }) => {
      dispatch(fetchThre({ boardId, cache }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thre);
