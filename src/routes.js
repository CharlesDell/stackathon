import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));

const renderLoader = () => <CircularProgress color='secondary' />;

const Routes = () => {
  return (
    <Suspense fallback={renderLoader()}>
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => <Home {...routeProps} />}
        />
        <Route
          exact
          path='/about'
          render={(routeProps) => <About {...routeProps} />}
        />
      </Switch>
    </Suspense>
  );
};

export default Routes;
