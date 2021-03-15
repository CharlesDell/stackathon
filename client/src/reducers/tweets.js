import axios from 'axios';

import { getPrediction } from './prediction';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { enqueueSnackbar, closeSnackbar } from '../reducers/snackbar';

const GOT_TWEETS = 'GOT_TWEETS';

const gotTweets = (tweets) => ({
  type: GOT_TWEETS,
  tweets,
});

export const getTweets = (hashtag) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/twitter/?query=${hashtag}`);
      dispatch(
        enqueueSnackbar({
          message: `Success! Found ${data.length} tweets`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            action: (key) => (
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => dispatch(closeSnackbar(key))}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            ),
          },
        })
      );
      dispatch(gotTweets(data));
      dispatch(getPrediction(data));
    } catch (err) {
      dispatch(
        enqueueSnackbar({
          message: 'Failed to find any Tweets',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            action: (key) => (
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => dispatch(closeSnackbar(key))}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            ),
          },
        })
      );
      console.error(err);
    }
  };
};

const initialState = { data: [], isLoading: true };

const tweets = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TWEETS:
      return { ...state, data: action.tweets, isLoading: false };
    default:
      return state;
  }
};

export default tweets;
