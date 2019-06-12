import React from 'react';
import { Link } from 'react-router-dom';

class Genre extends React.Component {
  componentDidMount() {
    if (this.props.genre.length === 0) {
      this.props.fetchGenre();
    }
  }

  render() {
    return (
      <div>
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

export default Genre;
