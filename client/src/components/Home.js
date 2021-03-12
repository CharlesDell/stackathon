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
      <Typography variant='h4'>See how Twitter feels about ...</Typography>
      <Search />
    </Container>
  );
};

export default Home;
