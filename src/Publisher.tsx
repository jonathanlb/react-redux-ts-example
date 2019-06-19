import React from 'react';
// import redux from 'redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { submitMessage } from './actions';

export interface PublisherProps {
  onSubmitMessage: (msg: string) => void;
}

// Export a non-connected component for testing purposes only.
export const SimplePublisher: React.FC<PublisherProps> = (props: PublisherProps) => {
  const { onSubmitMessage } = props;
  const [state, setState] = React.useState({
    message: '',
  });

  // Storing the state with updates to every key stroke causes lots of rendering....
  // Is this really the best pattern?
  // Pattern aped from material-ui demos.
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const { message } = state;
    if (message) {
      onSubmitMessage(message);
      setState({ ...state, message: '' });
    }
  };

  return (
    <Paper>
      <TextField id="submit-field"
        onChange={handleChange('message')}
        value={state.message}
        variant="outlined" />
      <Button onClick={handleSubmit} >
        Send
      </Button>
    </Paper>
  );
}

const mapStateToProps = (state: any) => ({ });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmitMessage: (msg: string) => dispatch(submitMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SimplePublisher);
