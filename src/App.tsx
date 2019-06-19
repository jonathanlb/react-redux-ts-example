import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Publisher from './Publisher';
import Receiver from './Receiver';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  item: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Typography variant="h1">
        Redux Example
      </Typography>
      <Grid container spacing={3}>
        <Grid className={classes.item} item xs={3}>
          <Typography variant="h2">
            Publish
          </Typography>
          <Publisher />
        </Grid>
        <Grid className={classes.item} item xs={3}>
          <Typography variant="h2">
            Receive
          </Typography>
          <Receiver />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
