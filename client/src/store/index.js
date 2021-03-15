import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import tweets from '../reducers/tweets';
import prediction from '../reducers/prediction';
import snackbar from '../reducers/snackbar';

const reducer = combineReducers({
  tweets,
  prediction,
  snackbar,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
