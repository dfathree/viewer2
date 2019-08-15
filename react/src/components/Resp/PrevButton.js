import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  button: {
    marginBottom: '1rem',
  },
});

const PrevButton = props => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={props.onClick}
    >
      前を表示
    </Button>
  );
}

export default PrevButton;
