import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '75%',
  },
}));

const PredictionCard = (props) => {
  const classes = useStyles();
  const { isLoadingPrediction, backgroundColor, prediction } = props;

  return (
    <React.Fragment>
      {!isLoadingPrediction && (
        <Card className={classes.card}>
          <CardContent style={{ backgroundColor: backgroundColor }}>
            <Typography variant='h5' component='h2'>
              Sentiment: {prediction.toFixed(3)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PredictionCard;
