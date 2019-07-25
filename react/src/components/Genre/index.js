import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  fetchGenre,
  updateGenre,
} from '../../modules/genre';

class Genre extends React.Component {
  componentDidMount() {
    if (this.props.genre.length === 0) {
      this.props.fetchGenre();
    }
  }

  onClick() {
    this.props.updateGenre();
  }

  render() {
    return (
      <div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Genre);
