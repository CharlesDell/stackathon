import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    alignItems: 'center',
    display: 'flex',

    color: theme.palette.primary.contrastText,
  },
  logo: {
    marginRight: theme.spacing(1),
    height: 25,
    width: 25,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
  filler: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Typography
          className={classes.title}
          variant='h6'
          component={Link}
          to='/'
        >
          <img
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt='Logo'
          />
          Hashtag
        </Typography>
        <div className={classes.filler} />
        <Button component={Link} to='/about' className={classes.button}>
          About The App
        </Button>
      </Toolbar>
    </AppBar>
  );
}
