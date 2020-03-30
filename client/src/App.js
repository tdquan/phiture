import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/partials/Alert';
// redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Fragment>
          <Route exact path='/' component={ Home } />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/login' component={ Login } />
              <Route exact path='/signup' component={ Signup } />
              <Route exact path='/dashboard' component={ Dashboard } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
