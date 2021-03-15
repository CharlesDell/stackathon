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
}));

const TweetList = (props) => {
  const classes = useStyles();

  const { isLoadingTweets, tweets } = props;

  return (
    <React.Fragment>
      {!isLoadingTweets && (
        <List>
          {tweets.map((tweet) => {
            return (
              <ListItem key={tweet.id}>
                <Accordion>
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
      )}
    </React.Fragment>
  );
};

export default TweetList;
