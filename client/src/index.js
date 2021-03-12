import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import history from './history';
import App from './app';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fbfbfb',
      main: '#fafafa',
      dark: '#afafaf',
      contrastText: '#000',
    },
    secondary: {
      light: '#33bfff',
      main: '#00b0ff',
      dark: '#007bb2',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
