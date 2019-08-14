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
      references: [],
      images: [],
      startResp: this.props.resp.bookmark || 1,
    };
    this.containerRef = React.createRef();
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ?
      window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getNextPage();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('click', this.handleLinkClick.bind(this));

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

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleLinkClick);
  }

  componentDidUpdate(prevProps, prevState) {
    // レスに含まれる画像のURLをstate.imagesに保存する
    if (this.containerRef.current) {
      const images = this.state.images.map(m => m && [...m])
      const imageElems = this.containerRef.current.querySelectorAll('.image');
      imageElems.forEach(m => {
        const resNum = Number(m.parentNode.parentNode.dataset.num);
        const ary = images[resNum] || [];

        // _.uniq
        images[resNum] = [...ary, m.textContent].filter((n, index, self) => self.indexOf(n) === index);
      })

      // deeply compare
      if (JSON.stringify(prevState.images) !== JSON.stringify(images)) {
        this.setState({ images });
      }
    }
  }

  handleLinkClick(e) {
    if (e.target.tagName === 'A') {
      if (e.target.className === 'reply_link') {
        return this.handleReplyLinkClick(e);
      }
      if (e.target.className === 'image') {
        return this.handleImageLinkClick(e);
      }
    }
  }

  handleReplyLinkClick(e) {
    e.preventDefault();

    const md = e.target.textContent.match(/^>>([0-9-,]+)$/);
    if (md) {
      const resNum = e.target.parentNode.parentNode.dataset.num;
      const refNum = parseInt(md[1]);
      let references = [...this.state.references];
      references[resNum] = refNum;
      this.setState({ references });

      const reffered = this.props.resp.resps.find(r => r.num === refNum);
      if (!reffered) {
        this.props.appendResp({
          boardId: this.props.board.ename,
          threId: this.props.thre.num,
          num: refNum,
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
    // 前回のキャッシュが残っているパターン
    if (this.props.resp.threId !== this.props.thre.num) {
      return <div>Loading...</div>;
    }

    const boardName = this.props.board.jname || '';
    const title = this.props.thre.title || '';
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
        {this.props.resp.resps.map(r => (
          <div key={r.num}>
            <Box mb={2}>
              <Paper>
                {this.renderResp(r)}
                {this.renderImages(r)}
                {this.renderRefResp(r)}
              </Paper>
            </Box>
            {this.renderBookmark(r)}
          </div>
        ))}
      </div>
    );
  }

  renderResp(resp) {
    return (
      <>
        <Box display="flex" flexDirection="row" px={1}>
          <Box mr={1}>
            <a href={resp.num} onClick={e => this.onResNumClick(e, resp)}>
              {resp.num}
            </a>
          </Box>
          <Box mr={1}>
            {resp.name}
            {resp.wacchoi}
          </Box>
          {resp.email && <Box mr={1}>{resp.email}</Box>}
          <Box mr={1}>{resp.date}</Box>
          <Box mr={1}>{resp.userid}</Box>
        </Box>
        <Divider />
        <Box p={1}>
          <div
            data-num={resp.num}
            dangerouslySetInnerHTML={{ __html: resp.contents }}
          />
        </Box>
      </>
    );
  }

  renderImages(resp) {
    const urls = this.state.images[resp.num];
    if (!urls) {
      return null;
    }
    return (
      <div>
        {urls.map(url =>
          <img key={url} src={url} width="50" />
        )}
      </div>
    );
  }

  renderRefResp(resp) {
    const ref = this.state.references[resp.num];

    if (!ref) {
      return null;
    }

    const refRes = this.props.resp.resps.find(r => r.num === ref);
    if (!refRes) {
      return null;
    }

    const refContent = refRes.contents;
    return (
      <>
        <Divider />
        <Box p={1}>
          <div>{ref}</div>
          <div dangerouslySetInnerHTML={{ __html: refContent }} />
        </Box>
      </>
    );
  }

  renderBookmark(resp) {
    const bookmark = this.props.resp.bookmark || -1;
    if (resp.num === bookmark) {
      return <div className={styles.bookmark}>ここまで読んだ</div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ genre, thre, resp }, { match }) => {
  const board = genre.board.find(b => b.ename === match.params.boardId) || {
    ename: match.params.boardId
  };
  const t = (thre && thre.thres.find(t => t.num === match.params.threId)) || {
    num: match.params.threId
  };

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resp);
