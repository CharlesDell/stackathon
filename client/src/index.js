import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import history from './history';
import App from './app';

import store from './store';

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
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Slide}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
