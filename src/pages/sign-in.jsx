import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import FormInput from '../components/form-input';
import SubmitButton from '../components/submit-button';
import { login } from '../redux/session/session.actions';

const SignIn = ({ history, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password, history);
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <div className="sign-in-up__container">
      <div className="sign-in-up__card">
        <h2 className="sign-in-up__card-title">Sign In</h2>
        <span className="sign-in-up__card-subtitle">Enter your username and password</span>

        <form className="sign-in-up__card-form" onSubmit={handleSubmit}>
          <FormInput
            id="username"
            name="username"
            type="username"
            handleChange={handleUsernameChange}
            value={username}
            placeholder="username"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            placeholder="password"
          />
          <div>
            <SubmitButton> Sign in </SubmitButton>
            <small className="sign-in-up__signup">
              Don&apos;t have an account?&nbsp;
              <Link to="signup">Sign up</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, history) => dispatch(login(username, password, history)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
