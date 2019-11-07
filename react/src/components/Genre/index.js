import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  fetchGenre,
  updateGenre,
} from '../../modules/genre';
import {
  fetchAccessHistories,
} from '../../modules/accessHistories';

class Genre extends React.Component {
  componentDidMount() {
    if (this.props.genre.length === 0) {
      this.props.fetchGenre();
    }
    if (!this.props.isAccessHistoriesLoaded) {
      this.props.fetchAccessHistories()
    }
  }

  onClick() {
    this.props.updateGenre();
  }

  render() {
    return (
      <div>
        <div>履歴</div>
        {this.props.accessHistories.map((history, hIndex) =>
          <div key={hIndex}>
            <Link to={`/boards/${history.board}/thres/${history.thre}/resps`}>
              {history.title.replace(/^\d+: /, '')}
            </Link>
            ({history.boardName})
          </div>
        )}
        <Button variant="outlined" onClick={() => this.onClick()}>更新</Button>
        {this.props.genre.map((g, gIndex) =>
          <div key={gIndex}>
            <div>{g.genre}</div>
            {g.boards.map((b, bIndex) =>
              <div key={bIndex}>
                <Link to={`/boards/${b.ename}/thres`}>{b.jname}</Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ genre, accessHistories }) => {
  return { ...genre, ...accessHistories };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenre: () => {
      dispatch(fetchGenre());
    },
    updateGenre: () => {
      dispatch(updateGenre());
    },
    fetchAccessHistories: () => {
      dispatch(fetchAccessHistories())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Genre);
