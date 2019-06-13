import React from 'react';
import { Link } from 'react-router-dom';

class Thre extends React.Component {
  componentDidMount() {
    if (!this.props.board) {
      return this.props.history.push('/');
    }

    // TODO
    // 最初にブックマークを取得。
    // ブックマークの番号から50 or 100ずつ取得
    if (this.props.thre.length === 0) {
      this.props.fetchThre({
        boardId: this.props.board.ename
      });
    }
  }

  render() {
    if (!this.props.board) {
      return <div/>;
    }

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

export default Thre;
