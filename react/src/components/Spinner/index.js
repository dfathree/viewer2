import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.module.css';

const Spinner = props => {
  return (
    <div className={styles.container}>
      { props.visible &&
        <CircularProgress color="secondary" />
      }
    </div>
  );
};

const mapStateToProps = ({ spinner }) => {
  return spinner;
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);
