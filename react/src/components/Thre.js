import React from 'react';
import { Link } from 'react-router-dom';

class Thre extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      updated: false,
    };
  }

  componentDidMount() {
    this.setState({ updated: false });

    if (!this.props.board) {
      return this.props.history.push('/');
    }

    // 最初にキャッシュを使用して素早く表示
    // その後、最新の状態に書き換える
    if (this.props.thre.thres.length === 0) {
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
    if (!this.props.board) {
      return <div/>;
    }

    return (
      <div>
        <div>{this.props.board.jname}</div>
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

export default Thre;
