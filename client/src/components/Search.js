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

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import TweetList from './TweetList';
import Snack from './Snack';

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
  cardHeader: {
    height: 25,
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction='down' />;
}

const Search = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    snack: <div />,
    hashtag: '',
    tweets: [],
    sentiment: 0,
    backgroundColor: '#ffe57f',
    finished: true,
  });

  const {
    snack,
    hashtag,
    tweets,
    sentiment,
    finished,
    backgroundColor,
  } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleClick = () => async () => {
    if (inputValid()) {
      setState({
        ...state,
        snack: (
          <Snack
            open={true}
            handleClose={handleClose}
            message={`Searching Twitter for #${hashtag}`}
            severity='info'
          />
        ),
      });
      const foundTweets = await getTweets();
      // setState({
      //   ...state,
      //   snack: (
      //     <Snack
      //       open={true}
      //       handleClose={handleClose}
      //       message={`Found ${foundTweets.length} tweets! Proceeding to Sentiment Analysis`}
      //       severity='success'
      //     />
      //   ),
      // });
      const sentiment = await getSentiment(foundTweets);
      // setState({
      //   ...state,
      //   sentiment: sentiment,
      //   finsihed: true,
      //   snack: (
      //     <Snack
      //       open={true}
      //       handleClose={handleClose}
      //       message={`Analysis Concluded`}
      //       severity='success'
      //     />
      //   ),
      // });
      console.log(state);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const inputValid = () => {
    return hashtag && !hashtag.match(/\s/g);
  };

  const getTweets = async () => {
    const { data } = await axios.get(`/api/twitter/?query=${hashtag}`);
    setState({ ...state, tweets: data });
    return data;
  };

  const getSentiment = async (tweets) => {
    const sentiment = await Promise.all(
      tweets.map(async (tweet) => {
        const { data } = await axios.post('/api/google-cloud/', {
          text: tweet.text,
        });
        return data.score;
      })
    );

    if (sentiment > 0.25) {
      setState({ ...state, backgroundColor: '#388e3c' });
    } else if (sentiment < -0.25) {
      setState({ ...state, backgroundColor: '#e53935' });
    } else {
      setState({ ...state, backgroundColor: '#ffe57f' });
    }

    return sentiment.reduce((acc, val) => acc + val, 0) / sentiment.length;
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
      {finished ? (
        <Card>
          <CardHeader
            className={classes.cardHeader}
            style={{ backgroundColor: backgroundColor }}
          ></CardHeader>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {sentiment}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
      <TweetList tweets={tweets} />
      {snack}
    </React.Fragment>
  );
};

export default Search;
