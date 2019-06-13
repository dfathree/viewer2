import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Resp extends React.Component {
  componentDidMount() {
    if (!this.props.board || !this.props.thre) {
      return this.props.history.push('/');
    }

    if (!('bookmark' in this.props.thre)) {
      this.props.fetchBookmark({
        boardId: this.props.board.ename,
        threId: this.props.thre.num,
      });
    }

    // TODO fetchResp に by_bookmark というオプションが必要
    this.props.fetchResp({
      boardId: this.props.board.ename,
      threId: this.props.thre.num,
    });
  }

  render() {
    if (!this.props.board || !this.props.thre) {
      this.props.history.push('/');
      return <div/>;
    }

    return (
      <div>
        <div>{this.props.board.jname} - {this.props.thre.title}</div>
        {this.props.resp.map(r =>
          <div key={r.num}>
            <Box mb={2}>
            <Paper>
              <Box display="flex" flexDirection="row" px={1}>
                <Box mr={1}>{r.num}</Box>
                <Box mr={1}>{r.name}{r.wacchoi}</Box>
                {r.email &&
                  <Box mr={1}>{r.email}</Box>
                }
                <Box mr={1}>{r.date}</Box>
                <Box mr={1}>{r.userid}</Box>
              </Box>
              <Divider/>
              <Box p={1}>
                <div dangerouslySetInnerHTML={{__html: r.contents}} />
              </Box>
            </Paper>
            </Box>
          </div>
        )}
      </div>
    );
  }
}

export default Resp;
