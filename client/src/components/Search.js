import React from 'react';
import { connect } from 'react-redux';

import { getTweets as getTweetsAndMakePrediction } from '../reducers/tweets';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import PredictionCard from './PredictionCard';
import TweetList from './TweetList';
import Notifier from './Notifier';

import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../reducers/snackbar';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => async () => {
    if (this.inputValid()) {
      this.props.enqueueSnackbar({
        message: `Searching Twitter for #${this.state.hashtag}`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
          action: (key) => (
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => this.props.closeSnackbar(key)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          ),
        },
      });
      this.props.getTweetsAndMakePrediction(this.state.hashtag);
    }
  };

  inputValid = () => {
    return this.state.hashtag && !this.state.hashtag.match(/\s/g);
  };

  render() {
    const { hashtag } = this.state;
    const {
      classes,
      tweets,
      isLoadingTweets,
      isLoadingPrediction,
      backgroundColor,
      prediction,
    } = this.props;
    return (
      <React.Fragment>
        <Notifier />
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
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button onClick={this.handleClick()}>Submit</Button>
        </FormControl>
        <div className={classes.cardContainer}>
          <PredictionCard
            isLoadingPrediction={isLoadingPrediction}
            backgroundColor={backgroundColor}
            prediction={prediction}
          />
        </div>
        <Typography variant='h5'>Analyzed Tweets:</Typography>
        <TweetList isLoadingTweets={isLoadingTweets} tweets={tweets} />
      </React.Fragment>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTweetsAndMakePrediction: (hashtag) =>
      dispatch(getTweetsAndMakePrediction(hashtag)),
    enqueueSnackbar: (...args) => dispatch(enqueueSnackbarAction(...args)),
    closeSnackbar: (...args) => dispatch(closeSnackbarAction(...args)),
  };
};

const mapState = (state) => {
  return {
    tweets: state.tweets.data,
    isLoadingTweets: state.tweets.isLoading,
    prediction: state.prediction.value,
    backgroundColor: state.prediction.backgroundColor,
    isLoadingPrediction: state.prediction.isLoading,
  };
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(Search));
