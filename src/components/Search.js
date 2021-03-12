import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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

const Search = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.margin}>
      <Grid container spacing={1} alignItems='flex-end'>
        <Grid item>
          <img
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt='Logo'
          />
        </Grid>
        <Grid item>
          <TextField id='search' label='Hashtag' color='secondary' />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default Search;
