import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Search from './Search';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Typography variant='h4'>Find out how Twitter feels about ...</Typography>
      <Search />
      <Typography variant='h4'>Hashtag</Typography>
    </Container>
  );
};

export default Home;
