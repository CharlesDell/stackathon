import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { enqueueSnackbar, closeSnackbar } from '../reducers/snackbar';

const GOT_PREDICTION = 'GOT_PREDICTION';

const gotPrediction = (prediction) => ({
  type: GOT_PREDICTION,
  prediction,
});

export const getPrediction = (tweets) => {
  return async (dispatch) => {
    try {
      const sentiment = await Promise.all(
        tweets.map(async (tweet) => {
          const { data } = await axios.post('/api/google-cloud/', {
            text: tweet.text,
          });
          return data.score;
        })
      );

      dispatch(
        enqueueSnackbar({
          message: 'Successfully made analysis',
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

      const avgSentiment =
        sentiment.reduce((acc, val) => acc + val, 0) / sentiment.length;

      dispatch(gotPrediction(avgSentiment));
    } catch (err) {
      dispatch(
        enqueueSnackbar({
          message: 'Failed to make analysis',
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

const initialState = { value: 0, backgroundColor: '#ffe57f', isLoading: true };

const prediction = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PREDICTION:
      let backgroundColor = '#ffe57f';
      if (action.prediction > 0.25) {
        backgroundColor = '#388e3c';
      } else if (action.prediction < -0.25) {
        backgroundColor = '#e53935';
      }
      return {
        ...state,
        value: action.prediction,
        backgroundColor: backgroundColor,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default prediction;
