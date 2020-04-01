import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './routing/PrivateRoute';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Inapp from './components/pages/Inapp';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/partials/Alert';
// redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={ store }>
      <Router>
        <Fragment>
          <Route exact path='/' component={ Home } />
          <div className="container-fluid">
            <Alert />
            <Switch>
              <Route exact path='/login' component={ Login } />
              <Route exact path='/signup' component={ Signup } />
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/new-inapp' component={ Inapp } />
              <PrivateRoute exact path='/inapps/:id' component={ Inapp } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
