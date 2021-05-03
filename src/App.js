import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NotFound from './pages/not-found';
import Daypicker from './pages/daypicker';
import Routine from './pages/routine';
import Header from './layout/header';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/daypicker" component={Daypicker} />
        <Route path="/routine/:routineId" component={Routine} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
