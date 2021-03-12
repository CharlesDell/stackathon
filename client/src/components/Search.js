import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  logo: {
    marginRight: theme.spacing(1),
    height: 25,
    width: 25,
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction='down' />;
}

const Search = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    open: false,
    hashtag: '',
  });

  const { open, hashtag } = state;

  const handleChange = (event) => {
    state[event.target.name] = event.target.value;
  };

  const handleClick = () => () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <React.Fragment>
      <FormControl className={classes.margin}>
        <Grid container spacing={1} alignItems='flex-end'>
          <Grid item>
            <Typography variant='h5'>#</Typography>
          </Grid>
          <Grid item>
            <TextField
              id='search'
              label='Hashtag'
              color='secondary'
              value={hashtag}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button onClick={handleClick()}>Submit</Button>
      </FormControl>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        message='I love snacks'
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default Search;
