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

import axios from 'axios';

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
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleClick = () => () => {
    if (inputValid()) {
      const { data } = axios.get(`/api/prediction/?query=${hashtag}`);
      setState({ ...state, open: true });
      console.log(data);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const inputValid = () => {
    // console.log(hashtag);
    // console.log(hashtag.match(/\s/g).length);
    return hashtag && !hashtag.match(/\s/g);
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
              name='hashtag'
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
        message={`Searching Twitter for #${hashtag}`}
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
