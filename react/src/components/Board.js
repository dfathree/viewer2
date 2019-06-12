import React from 'react';
import { Link } from 'react-router-dom';

class Board extends React.Component {
  componentDidMount() {
    if (this.props.thre.length === 0) {
      this.props.fetchThre(this.props.board.ename);
    }
  }

  render() {
    return (
      <div>
        <div>{this.props.board.jname}</div>
        <div>
          {this.props.thre.map(thre =>
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

export default Board;
