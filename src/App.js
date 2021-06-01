import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NotFound from './pages/not-found';
import Daypicker from './pages/daypicker';
import Routine from './pages/routine';
import Header from './layout/header';
import Progress from './pages/progress';
import PrivateRoute from './utilities/private-route';
import { selectChecked, selectAuthenticated } from './redux/session/session.selectors';

const App = ({ authenticated, checked }) => (
  <div className="app">
    <Header />
    { checked
          && (
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} authenticated={authenticated} />
            <PrivateRoute path="/daypicker" component={Daypicker} authenticated={authenticated} />
            <PrivateRoute path="/progress" component={Progress} authenticated={authenticated} />
            <PrivateRoute path="/routine/:routineId" component={Routine} authenticated={authenticated} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/*" component={NotFound} />
          </Switch>
          )}
  </div>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
  checked: selectChecked,
});

export default connect(
  mapStateToProps,
  null,
)(App);
