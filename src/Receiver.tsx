import React from 'react';
import redux from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Delete from '@material-ui/icons/Delete';

import { deleteMessage } from './actions';

type ReceiverProps = {
  messages: string[];
  onClickMessage: (idx: number) => void;
}

const useStyles = makeStyles(theme => ({
  msg: {
    textAlign: 'left'
  }
}));

// Export a non-connected component for testing purposes only.
export const SimpleReceiver: React.FC<ReceiverProps> = (props: ReceiverProps) => {
  const { messages, onClickMessage } = props;
  const classes = useStyles();
  
  const content = messages.map((msg, i) => (
    <Paper className={classes.msg} key={i} >
      <Button onClick={() => onClickMessage(i)}><Delete/></Button>
      { msg }
    </Paper>
  ));

  return (
    <Paper>
      { content }
    </Paper>
  );
}

const mapStateToProps = (state: any) => {
  const { messages } = state || { messages: [] };
  return { messages }; // Keep result spare to prevent TS compiler from inferring detailed type.
};

const mapDispatchToProps = (dispatch: redux.Dispatch) => ({
  onClickMessage: (idx: number) => dispatch(deleteMessage(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleReceiver);
