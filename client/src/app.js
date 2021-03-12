import React, { lazy, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const NavBar = lazy(() => import('./components/NavBar'));
const Routes = lazy(() => import('./routes'));

const renderLoader = () => <CircularProgress color='secondary' />;

const App = () => {
  return (
    <Suspense fallback={renderLoader()}>
      <nav>
        <NavBar />
      </nav>
      <main>
        <Routes />
      </main>
    </Suspense>
  );
};

export default App;
