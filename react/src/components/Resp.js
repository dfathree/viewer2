import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Resp extends React.Component {
  handleScroll() {
     const windowHeight = 'innerHeight' in window ?
       window.innerHeight : document.documentElement.offsetHeight;
     const body = document.body;
     const html = document.documentElement;
     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
     const windowBottom = windowHeight + window.pageYOffset;
     if (windowBottom >= docHeight) {
       this.getNextPage();
     }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    if (!this.props.board || !this.props.thre) {
      return this.props.history.push('/');
    }

    this.props.fetchRespByBookmark({
      boardId: this.props.board.ename,
      threId: this.props.thre.num,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getNextPage() {
    const lastRes = this.props.resp.resps.slice(-1)[0];
    if (lastRes) {
      const num = `${lastRes.num + 1}-${lastRes.num + 50}`;
      this.props.appendResp({
        boardId: this.props.board.ename,
        threId: this.props.thre.num,
        num,
      });
    }
  }

  onResNumClick(e, r) {
    e.preventDefault();
    e.stopPropagation();
    this.props.setBookmark({
      boardId: this.props.board.ename,
      threId: this.props.thre.num,
      bookmark: r.num,
    })
  }

  render() {
    if (!this.props.board || !this.props.thre) {
      return <div/>;
    }

    return (
      <div>
        <div>{this.props.board.jname} - {this.props.thre.title}</div>
        {this.props.resp.resps.map(r =>
          <div key={r.num}>
            <Box mb={2}>
            <Paper>
              <Box display="flex" flexDirection="row" px={1}>
                <Box mr={1}>
                  <a href={r.num} onClick={e => this.onResNumClick(e, r)}>{r.num}</a>
                </Box>
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
