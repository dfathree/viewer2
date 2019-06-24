import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../css/Spinner.module.css';

const Spinner = props => {
  return (
    <div className={styles.container}>
      { props.visible &&
        <CircularProgress color="secondary" />
      }
    </div>
  );
};

export default Spinner;
