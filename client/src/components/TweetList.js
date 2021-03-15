import React from 'react';

// Accordian related imports
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

// List related imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// Misc Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  item: {
    width: '100%',
  },
}));

const TweetList = (props) => {
  const classes = useStyles();

  const { isLoadingTweets, tweets } = props;

  return (
    <React.Fragment>
      {!isLoadingTweets && (
        <React.Fragment>
          <Typography variant='h5'>Analyzed Tweets:</Typography>
          <List>
            {tweets.map((tweet) => {
              return (
                <ListItem key={tweet.id}>
                  <Accordion className={classes.item}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <Typography className={classes.heading}>
                        {`ID: ${tweet.id}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{tweet.text}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              );
            })}
          </List>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TweetList;
