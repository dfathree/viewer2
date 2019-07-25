import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { fetchGenre } from '../../modules/genre';
import { fetchThre } from '../../modules/thre';
import {
  appendResp,
  fetchRespByBookmark,
  setBookmark,
} from '../../modules/resp';
import styles from './styles.module.css';

class Resp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reffernce: [],
    };
    this.containerRef = React.createRef();
  }

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

    this.props.fetchRespByBookmark({
      boardId: this.props.board.ename,
      threId: this.props.thre.num,
    });

    if (!this.props.board.jname) {
      this.props.fetchBoard({ boardId: this.props.board.ename });
    }

    if (!this.props.thre.title) {
      this.props.fetchThre({ boardId: this.props.board.ename });
    }
  }

  componentDidUpdate() {
    this.replyLinks = this.containerRef.current.querySelectorAll('a.reply_link');
    this.replyLinks.forEach(a =>
      a.addEventListener('click', e => this.handleReplyLinkClick(e))
    );

    this.imageLinks = this.containerRef.current.querySelectorAll('a.image');
    this.imageLinks.forEach(a =>
      a.addEventListener('click', e => this.handleImageLinkClick(e))
    );
  }

  componentWillUnmount() {
    this.replyLinks.forEach(a => a.removeEventListener('click', this.handleReplyLinkClick));
    this.imageLinks.forEach(a => a.removeEventListener('click', this.handleImageLinkClick));
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleReplyLinkClick(e) {
    e.preventDefault();

    const md = e.target.textContent.match(/^>>([0-9-,]+)$/);
    if (md) {
      const resNum = e.target.parentNode.parentNode.dataset.num;
      const refNum = parseInt(md[1]);
      let reffernce = [...this.state.reffernce];
      reffernce[resNum] = refNum;
      this.setState({ reffernce });

      const reffered = this.props.resp.resps.find(r => r.num === refNum);
      if (!reffered) {
        this.props.appendResp({
          boardId: this.props.board.ename,
          threId: this.props.thre.num,
          refNum,
        });
      }
    }
  }

  handleImageLinkClick(e) {
    e.preventDefault();
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
    this.props.setBookmark({
      boardId: this.props.board.ename,
      threId: this.props.thre.num,
      bookmark: r.num,
    });
  }

  render() {
    const boardName = this.props.board.jname || '';
    const title = this.props.thre.title || '';
    const bookmark = this.props.resp.bookmark || -1;
    return (
      <div ref={this.containerRef}>
        <Paper elevation={0} className={styles.breadcrumbs}>
          <Breadcrumbs>
            <Link to="/">トップ</Link>
            <Link to={`/boards/${this.props.board.ename}/thres`}>
              {boardName}
            </Link>
            <div>{title}</div>
          </Breadcrumbs>
        </Paper>
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
                  <div
                    data-num={r.num}
                    dangerouslySetInnerHTML={{__html: r.contents}}
                  />
                </Box>
              </Paper>
            </Box>
            {r.num === bookmark &&
              <div className={styles.bookmark}>ここまで読んだ</div>
            }
          </div>
        )}
      </div>
    );
  }
}

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

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Resp);
