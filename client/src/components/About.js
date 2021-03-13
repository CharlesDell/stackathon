import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  subtitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    fontSize: '1.5rem',
  },
  content: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth='sm' className={classes.container}>
        <Typography variant='h3'>Hashtag</Typography>
        <Typography variant='body1' className={classes.subtitle}>
          A machine learning progressive web application built with
          TensorFlow.js on the (P)ERN stack
        </Typography>
        <Typography variant='h4'>Goal</Typography>
        <Typography variant='body1' className={classes.content}>
          Hashtag aims to perform sentiment analysis on tweets based on their,
          you guessed it, hashtag and see how well a machine learning algorithm
          can gauge Twitter's stance on a particular subject.
        </Typography>
        <Typography variant='h4'>Tech</Typography>
        <Typography variant='body1' className={classes.content}>
          Hashtag is built on the PERN stack, or rather just ERN since PostgrSQL
          is not being used
        </Typography>
      </Container>
    </div>
  );
};

export default About;
