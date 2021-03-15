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
          A machine learning progressive web application built with the Google
          Cloud API
        </Typography>
        <Typography variant='h4'>Goal</Typography>
        <Typography variant='body1' className={classes.content}>
          Hashtag aims to perform sentiment analysis on tweets based on their,
          you guessed it, hashtag. Further, as a bootcamp project, it has
          provided this developer with a deeper understanding of machine
          learning algorithms as well as a number of other javascript libraries.
        </Typography>
        <Typography variant='h4'>Tech</Typography>
        <Typography variant='body1' className={classes.content}>
          Hashtag is built on the ERN (ExpressReactNode) stack, with no database
          integration at this moment. For the Front-end, Material-UI was used
          for layout and design, React-Redux was used to manage state, and
          notistack was used for toast notifications. On the backend Node.js and
          Express were used for simple routing. The most interesting portion of
          this project though was the integration of Google Cloud's Natural
          Language API.
        </Typography>
        <Typography variant='h4'>The Natural Language API</Typography>
        <Typography variant='h6'>(or the Troubles with TensorFlow)</Typography>
        <Typography variant='body1' className={classes.content}>
          This project was originally intended to be built with TensorFlow.js,
          an offshot of the hugely popular python based machine learning
          library. However, as the project continued it became increasingly
          clear that TensorFlow was never intended to be a robust solution for
          javascript. I ran into the most amount of problems when it came to
          training the model I built (the code for which has been left on the
          prjects <a href='https://github.com/CharlesDell/stackathon'>github</a>
          for posterity). I found that javascript was never meant to (or perhaps
          I was never meant to) format and sift through multi-million lined .csv
          files as I would constantly exceed my computers memory limits, but
          rather that that task should be left to python. In walks Google
          Cloud's Natural Language API, a fully functioning, scalable, and
          easily implemented solution. The NL API is a incredibley useful tool
          for performing rich text analysis, beyond its use here, that uses an
          incredibly fascinating deep learning model developed by Google.
        </Typography>
        <Typography variant='h4'>The Takeaway</Typography>
        <Typography variant='body1' className={classes.content}>
          Overall, I feel mildly defeated by TensorFlow, but nevertheless still
          appreaciative of everything I learned during the productive struggle
          in trying to get it to work. Machine learning is an incredibly dense
          but rewarding topic and I learned a lot building the application.
          Enjoy.
        </Typography>
      </Container>
    </div>
  );
};

export default About;
